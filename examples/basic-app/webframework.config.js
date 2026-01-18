export default {
  // File-system routes directory
  routesDir: 'src/routes',

  // Build output directory
  outDir: '.next',

  // Static assets directory
  publicDir: 'public',

  // Dev server configuration
  server: {
    port: 3000,
    host: 'localhost',
  },

  // Middleware configuration
  middleware: {
    global: [],
  },

  // Build configuration
  build: {
    // Minify output
    minify: true,

    // Analyze bundle size
    analyze: false,

    // Output source maps
    sourceMaps: true,

    // Target browsers/runtimes
    targets: {
      client: 'ES2020',
      server: 'node',
    },
  },

  // Styling configuration
  css: {
    // PostCSS plugins
    postcss: {
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  // Environment variables
  env: {},
};
