const fsp = require('fs').promises;
const path = require('path');

async function main() {
  // 查找的文件夹
  const dir = 'G:\\Users\\Administrator\\Desktop\\新建文件夹';
  const files = await fsp.readdir(dir);
  files.forEach(async (file) => {
    let fileInfo = path.parse(file);
    let newFileName = fileInfo.name.replace(
      /\s*\d{4}-\d{2}-\d{2}\s\d{2}_\d{2}\s*$/g, // 替换规则
      ''
    );
    newFileName = newFileName.trimEnd();
    const oldFilePath = path.join(dir, file);
    const newFilePath = path.join(dir, newFileName + fileInfo.ext);
    if (oldFilePath !== newFilePath) {
      await fsp.rename(oldFilePath, newFilePath);
      console.log(`${file} -> ${newFilePath} done`);
    }
  });
}

main().then(() => {
  console.log('done');
});
