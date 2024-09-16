import { join, sep, extname } from 'path';
import { readdir, stat } from 'fs/promises';

/**
 * @param {string} dir An absolute path
 * @returns {Promise<string[]>}
 */
// readdir's withFileTypes option uses experimental properties from fs.Dirent so can't use that
export async function getFilesRecursively(dir) {
  const content = await readdir(dir);
  const output = [];
  
  for (const c of content) {
    const isDir = (await stat(join(dir, c))).isDirectory();
    
    if (isDir) {
      output.push(
        ...(await getFilesRecursively(join(dir, c))).map(f => `${c}${sep}${f}`)
      );
    } else {
      output.push(c);
    }
  }

  return output;
}

/**
 * @param {string[]} arr
 * @param {string} str
 */
function caseInsensitiveInclude(arr, str) {
  return arr.map(a => a.toLowerCase()).includes(str.toLowerCase());
}

/**
 * @param {string[]} arr An array of file paths
 * @param {string[]} extArr An array of file extensions
 */
export function filterByExtensionArr(arr, extArr) {
  return arr.filter(f => caseInsensitiveInclude(extArr, extname(f)));
}

/**
 * @param {string} dir
 * @param {string[]} exts
 * @param {(f: string) => boolean} filter
 */
export async function getFiles(dir, exts, filter) {
  return (await filterByExtensionArr(await getFilesRecursively(dir), exts)).filter(filter);
}
