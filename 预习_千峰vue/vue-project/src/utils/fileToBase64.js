

// 异步转化
export default function (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      resolve(this.result)
    };
    fileReader.onerror = () => {
      reject('转换失败')
    }
  })
}