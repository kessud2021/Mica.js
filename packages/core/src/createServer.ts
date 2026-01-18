export interface ServerConfig {
  port: number;
  host: string;
  isDev: boolean;
}

export interface RouteContext {
  params: Record<string, any>;
  request: Request;
  headers: Record<string, string>;
}

export type RouteHandler = (ctx: RouteContext) => Promise<Response>;

export default function createServer(config: ServerConfig) {
  const handlers: Map<string, RouteHandler> = new Map();
  const middleware: Array<(ctx: RouteContext) => Promise<void | Response>> = [];

  function use(handler: (ctx: RouteContext) => Promise<void | Response>) {
    middleware.push(handler);
  }

  function registerHandler(path: string, handler: RouteHandler) {
    handlers.set(path, handler);
  }

  async function handleRequest(request: Request, pathname: string): Promise<Response> {
    const ctx: RouteContext = {
      params: {},
      request,
      headers: {},
    };

    for (const mw of middleware) {
      const result = await mw(ctx);
      if (result instanceof Response) return result;
    }

    const handler = handlers.get(pathname);
    if (!handler) {
      return new Response('Not Found', { status: 404 });
    }

    try {
      return await handler(ctx);
    } catch (error) {
      if (config.isDev) console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  async function listen() {
    console.log(`Server running on http://${config.host}:${config.port}`);
  }

  return { use, registerHandler, handleRequest, listen };
}
