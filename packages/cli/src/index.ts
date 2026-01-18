#!/usr/bin/env node

export { default as createApp } from './createApp.js';
export { default as parseArgs } from './parseArgs.js';

import createApp from './createApp.js';
import parseArgs from './parseArgs.js';

async function main() {
  const { command, args, options } = parseArgs(process.argv);

  try {
    if (command === 'create' || command === 'create-app') {
      const appName = args[0];
      if (!appName) throw new Error('App name required');
      await createApp({
        appName,
        typescript: !options['no-ts'],
      });
    } else if (command === 'dev') {
      console.log('🚀 Starting dev server...');
    } else if (command === 'build') {
      console.log('🔨 Building...');
    } else if (command === 'start') {
      console.log('▶️  Starting production server...');
    } else {
      console.log(`Unknown command: ${command}`);
      console.log(`\nUsage:\n  mica create <app-name>\n  mica dev\n  mica build\n  mica start\n`);
    }
  } catch (error) {
    console.error('✗ Error:', (error as Error).message);
    process.exit(1);
  }
}

main();
