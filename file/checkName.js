const fsp = require('fs').promises;

async function main() {
  // 查找的文件夹
  const dir = 'E:\\OneDrive\\Box\\学习\\极客时间\\微信小程序全栈开发实战课';
  const files = await fsp.readdir(dir, { withFileTypes: true });

  let names = [];
  let indexSet = new Set();

  files.forEach(async (file) => {
    let index = /^\d*/.exec(file.name);
    if (index) {
      let i = Number.parseInt(index[0]);
      if (indexSet.has(i)) {
        console.log(`重复：${file.name}`);
      } else {
          indexSet.add(i);
      }
      file.index = i;
    } else {
      throw new Error(`${file.name} not match a number`);
    }

    names.push(file);
  });
    
    // 判断是否有遗漏
    let start = 1;
    while (true) {
        if (indexSet.has(start)) {
            start++;
        } else {
            console.log(`遗漏：${start}`);
            break;
        }
    }
}

main().then(() => {
  console.log('done');
});
