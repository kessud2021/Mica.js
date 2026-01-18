export interface CliArgs {
  command: string;
  args: string[];
  options: Record<string, string | boolean>;
}

export default function parseArgs(argv: string[]): CliArgs {
  const [command, ...rest] = argv.slice(2);
  const args: string[] = [];
  const options: Record<string, string | boolean> = {};

  for (const arg of rest) {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value || true;
    } else if (arg.startsWith('-')) {
      options[arg.slice(1)] = true;
    } else {
      args.push(arg);
    }
  }

  return { command, args, options };
}
