import { build } from 'esbuild';
import pluginVue from 'esbuild-plugin-vue-next';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// const template = readFileSync(resolve(__dirname, './src/footer.html'), 'utf8');

// const darkModeCss = readFileSync(resolve(__dirname, './src/dark.css'), 'utf8');

// const inlinedTemplate = await inline(template, {
//   url: 'data:image/svg+xml;base64,',
//   removeStyleTags: false,
//   preserveMediaQueries: true,
// });

// const cssdTemplate =
//   inlinedTemplate.split('</style>')[0] +
//   `\n${darkModeCss}</style></body></html>`;

// console.log(cssdTemplate);

// writeFileSync('./src/generated/footer-inlined.html', cssdTemplate);

await build({
  entryPoints: ['./src/main.ts'],
  outfile: './src/generated/index.js',
  format: 'esm',
  bundle: true,
  minify: true,
  sourcemap: false,
  loader: {
    '.html': 'text',
    '.mjml': 'text',
    '.svg': 'dataurl',
  },
  plugins: [pluginVue()],
}).catch(() => process.exit(1));

const html = readFileSync(resolve(__dirname, './src/index.html'), 'utf8');

const compiledJs = readFileSync(
  resolve(__dirname, './src/generated/index.js'),
  'utf8'
);

const compiledCss = readFileSync(
  resolve(__dirname, './src/generated/index.css'),
  'utf8'
);

const htmlWithJs =
  html.split('</body>')[0] +
  `\n<style type="text/css">${compiledCss}</style>\n<script type="module">${compiledJs}</script></body></html>`;

writeFileSync(resolve(__dirname, './dist/generator.html'), htmlWithJs);

console.log('⚡ Done');
