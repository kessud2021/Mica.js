import * as fs from 'fs-extra';
import * as path from 'path';

export interface CreateAppOptions {
  appName: string;
  typescript: boolean;
}

export default async function createApp(options: CreateAppOptions) {
  const appPath = path.resolve(options.appName);

  if (fs.existsSync(appPath)) {
    throw new Error(`Directory '${options.appName}' already exists`);
  }

  console.log(`\n📦 Creating app: ${options.appName}\n`);

  fs.ensureDirSync(appPath);
  fs.ensureDirSync(path.join(appPath, 'src/routes'));
  fs.ensureDirSync(path.join(appPath, 'src/styles'));
  fs.ensureDirSync(path.join(appPath, 'public'));

  const packageJson = {
    name: options.appName,
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'mica dev',
      build: 'mica build',
      start: 'mica start',
    },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      '@mica.js/core': '*',
    },
    devDependencies: {
      '@mica.js/build': '*',
      '@mica.js/cli': '*',
      typescript: '^5.3.3',
    },
  };

  fs.writeJsonSync(path.join(appPath, 'package.json'), packageJson, { spaces: 2 });

  const tsconfig = {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020', 'DOM'],
      jsx: 'react-jsx',
      module: 'ESNext',
      moduleResolution: 'node',
      strict: true,
    },
    include: ['src'],
  };

  fs.writeJsonSync(path.join(appPath, 'tsconfig.json'), tsconfig, { spaces: 2 });

  const indexFile = `import React from 'react';
import ReactDOM from 'react-dom/client';

export default function App() {
  return <h1>Hello from Mica.js</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
`;

  const ext = options.typescript ? 'tsx' : 'jsx';
  fs.writeFileSync(path.join(appPath, `src/index.${ext}`), indexFile);

  const globalCss = `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

#root {
  min-height: 100vh;
}
`;

  fs.writeFileSync(path.join(appPath, 'src/styles/globals.css'), globalCss);

  const htmlFile = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${options.appName}</title>
</head>
<body>
  <div id="root"></div>
  <script src="src/index.${ext}"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(appPath, 'index.html'), htmlFile);

  console.log(`\n✓ App created successfully\n`);
  console.log(`Next steps:\n`);
  console.log(`  cd ${options.appName}`);
  console.log(`  npm install`);
  console.log(`  npm run dev\n`);
}
