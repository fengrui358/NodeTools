const fsp = require('fs').promises;
const path = require('path');

async function main() {
  // 查找的文件夹
  const dir = 'E:\\OneDrive\\Box\\学习\\极客时间\\微信小程序全栈开发实战课';
  const files = await getFiles(dir);

  files.forEach(async (file) => {
    let fileInfo = path.parse(file);
    let newFileName = fileInfo.name.replace(
      /\s*\d{4}-\d{2}-\d{2}\s\d{2}_\d{2}\s*$/g, // 替换规则
      ''
    );
    newFileName = newFileName.trimEnd();
    const newFilePath = path.join(fileInfo.dir, newFileName + fileInfo.ext);
    if (file !== newFilePath) {
      // await fsp.rename(file, newFilePath);
      console.log(`${file} -> ${newFilePath} done`);
    }
  });
}

/** 查找文件，包括子目录 */
async function getFiles(dir) {
  const dirents = await fsp.readdir(dir, { withFileTypes: true });
  let fileList = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      fileList = fileList.concat(await getFiles(path.join(dir, dirent.name)));
    } else { 
      fileList.push(path.join(dir, dirent.name));
    }
  }

  return fileList;
}

main().then(() => {
  console.log('done');
});
