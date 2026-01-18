import * as fs from 'fs';
import * as path from 'path';

export interface RouteDefinition {
  path: string;
  pattern: RegExp;
  params: string[];
  component: string;
  isDynamic: boolean;
}

export interface ParsedParams {
  [key: string]: string | string[];
}

export default async function createRouter(routesDir: string) {
  const routes: Map<string, RouteDefinition> = new Map();

  if (!fs.existsSync(routesDir)) {
    return { routes, match };
  }

  function scanDir(dir: string, prefix: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scanDir(fullPath, prefix);
      } else if (/^\([a-zA-Z0-9\.\[\]\.\.\.]+\)\.(jsx?|tsx?)$/.test(file)) {
        const route = parseRoute(file, prefix);
        routes.set(route.path, route);
      }
    }
  }

  function parseRoute(filename: string, prefix: string): RouteDefinition {
    const match = filename.match(/^\(([^)]+)\)/);
    if (!match) throw new Error(`Invalid route: ${filename}`);
    const routeName = match[1];
    const parts = routeName.split('.');
    let routePath = prefix;
    const params: string[] = [];
    let pattern = '';
    for (const part of parts) {
      if (!part) continue;
      if (part.startsWith('[') && part.endsWith(']')) {
        const paramName = part.slice(1, -1);
        if (paramName.startsWith('...')) {
          params.push(paramName.slice(3));
          pattern += '/(.+)';
        } else {
          params.push(paramName);
          pattern += '/([^/]+)';
        }
        routePath += `/:${paramName.replace(/\.\.\./g, '')}`;
      } else if (part === 'home') {
        if (routePath === prefix) routePath = '/';
      } else {
        pattern += `/${part}`;
        routePath += `/${part}`;
      }
    }
    if (!routePath) routePath = '/';
    if (!pattern) pattern = '^/$';
    else pattern = `^${pattern}/?$`;
    return {
      path: routePath,
      pattern: new RegExp(pattern),
      params,
      component: path.join(routesDir, filename),
      isDynamic: params.length > 0,
    };
  }

  function match(requestPath: string) {
    for (const route of routes.values()) {
      const m = route.pattern.exec(requestPath);
      if (m) {
        const params: ParsedParams = {};
        for (let i = 0; i < route.params.length; i++) {
          const value = m[i + 1];
          const paramName = route.params[i];
          if (paramName.startsWith('...')) {
            params[paramName.slice(3)] = value.split('/');
          } else {
            params[paramName] = value;
          }
        }
        return { route, params };
      }
    }
    return null;
  }

  scanDir(routesDir, '');
  return { routes, match };
}
