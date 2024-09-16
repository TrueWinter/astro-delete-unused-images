import { fileURLToPath } from 'url';
import { readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { getFiles } from './util';

/** @type {import('../types').Integration<Required<import('../types').Opts>} */
export default function(opts) {
  /** @type {import('astro').AstroConfig} */
  let config;

  return {
    name: 'delete-unused-images',
    hooks: {
      'astro:config:done': ({ config: _config }) => {
        config = _config;
      },
      'astro:build:done': async ({ dir, logger }) => {
        if (config.output !== 'static') {
          logger.info('This integration only works in static output mode');
          return;
        }

        const distDir = fileURLToPath(dir);
        const assetDir = fileURLToPath(new URL(config.build.assets, dir));
        logger.debug(`Dist: ${distDir}`);
        logger.debug(`Asset: ${assetDir}`);

        const files = await getFiles(distDir, opts.checkExtensions, opts.checkFiles);
        const images = await getFiles(assetDir, opts.imageExtensions, opts.filterImages);

        logger.debug(`Files: ${files.join(', ')}`);
        logger.debug(`Images: ${images.join(', ')}`);

        imgLoop: for (const image of images) {
          for (const file of files) {
            const content = await readFile(join(distDir, file));
            if (content.includes(image)) {
              logger.debug(`Found ${image} in file ${file}`);
              continue imgLoop;
            }
          }

          if (opts.dryRun) {
            logger.info(`${image} unused`);
          } else {
            logger.info(`Deleting unused image ${image}`);
            await unlink(join(assetDir, image));
          }
        }
      }
    }
  }
}
