import type { AstroIntegration } from 'astro';

export interface Opts {
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

export type Integration<T = Opts> = (opts: T) => AstroIntegration
