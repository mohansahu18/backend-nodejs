const fs = require('fs')
let fileStream = fs.createReadStream(__dirname + "/input.txt")
let outputStream = process.stdout;
fileStream.pipe(outputStream);