const fs = require('fs')
const crypto = require('crypto')
const { parentPort } = require('worker_threads')

parentPort.on('message', (message) => {
  const hasher = crypto.createHash('sha256')
  fs.createReadStream('example.txt')
    .pipe(hasher)
    .on('finish', () => {
      const { buffer } = hasher.read()
      parentPort.postMessage({ value: buffer }, [buffer])
    })
})
