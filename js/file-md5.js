'use strict'

const SparkMD5 = require('tiens_plupload/js/js-spark-md5')

export default function(file, chunkSize) {
  return new Promise((resolve, reject) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    let chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    let spark = new SparkMD5.ArrayBuffer()
    let fileReader = new FileReader()

    fileReader.onload = function(e) {
      spark.append(e.target.result) // Append array buffer
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        let md5 = spark.end()
        resolve(md5)
      }
    }

    fileReader.onerror = function(e) {
      reject(e)
    }

    function loadNext() {
      let start = currentChunk * chunkSize;
      let end = (start + chunkSize) >= file.size ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }

    loadNext();
  })
}
