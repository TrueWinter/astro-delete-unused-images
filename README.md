# astro-delete-unused-images

`astro-delete-unused-images` is an Astro integration for use with static websites that deletes unused images from the `dist` directory.

![Image](https://cdn.truewinter.net/i/9cbd46.jpg)

> [!IMPORTANT]
> The image names must be detectable through very basic static analysis. For example: if the image is called `logo.BId0WUMc_1IXhhw.webp`, it will not be detected if you reference the image as `'logo.BId0WUMc' + '_1IXhhw.webp'`. Use the `filterImages` option to skip images referenced in this way to keep them in the build output.

## Why?

Astro keeps the original images in the `dist` directory just in case they're needed on the website. This isn't an issue for small websites, but for image-heavy websites (especially those that use HD images) this can take up a lot of additional storage space on production servers and increase CI/CD deploy times.

Relevant issues:

- https://github.com/withastro/astro/issues/11887
- https://github.com/withastro/astro/issues/4961
- https://github.com/withastro/astro/issues/8866

## Installation

Ensure that your output mode is set to `static` as this integration currently does not support other modes.

### Automatic

Run `npx astro add astro-delete-unused-images`.

### Manual

Modify your `astro.config.mjs` file as follows:

```js
import deleteUnusedImages from 'astro-delete-unused-images';

export default defineConfig({
  integrations: [deleteUnusedImages()]
});
```

## Configuration

The following options are available:

```js
interface Opts {
  /** If true, check if this image is referenced and remove it if it isn't */
  filterImages?: (img: string) => boolean
  /**
   * If true, check this file for referenced images. Use caution with this option
   * as the image will be deleted if it does not exist in any of the checked files.
   */
  checkFiles?: (file: string) => boolean
  /** List of image file extensions. Default: `['.jpg', '.jpeg', '.png', '.webp', '.avif']` */
  imageExtensions?: string[]
  /** List of file extensions to check. Default: `['.html', '.css', '.js']` */
  checkExtensions?: string[]
  /** Don't delete unused images */
  dryRun?: boolean
}
```

### Example

```js
deleteUnusedImages({
  filterImages: (img) => !img.includes('skip')
})
```