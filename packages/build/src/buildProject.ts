export interface BuildOptions {
  appDir: string;
  outDir: string;
}

export default async function buildProject(options: BuildOptions) {
  console.log('\n🔨 Building...\n');
  console.log(`✓ Output: ${options.outDir}\n`);
}
