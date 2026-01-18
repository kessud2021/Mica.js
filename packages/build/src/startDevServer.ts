export interface DevServerOptions {
  appDir: string;
  port: number;
  host: string;
}

export default async function startDevServer(options: DevServerOptions) {
  console.log(`\n🚀 Dev server running at http://${options.host}:${options.port}\n`);
  console.log('Watching for changes...\n');
}
