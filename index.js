const path = require('path')
const { Worker } = require('worker_threads')

async function main() {
  const worker = new Worker(path.join(__dirname, 'worker.js'))
  worker.postMessage({})
  worker.on('message', (message) => {
    const hash = Buffer.from(message.value).toString('hex')
    console.log(hash)
    worker.unref()
  })
}

main()
