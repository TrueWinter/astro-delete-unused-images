import integration from './src/integration.js';

/** @type {import('./types').Opts} */
const DEFAULT_PROPS = {
  filterImages: () => true,
  checkFiles: () => true,
  imageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  checkExtensions: ['.html', '.css', '.js'],
  dryRun: false
}

/** @type {import('./types').Integration} */
export default function(opts) {
  return integration({
    ...DEFAULT_PROPS,
    ...opts
  });
}
