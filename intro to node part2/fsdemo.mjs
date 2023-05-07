// import * as fs from 'node:fs/promises';
import { readFile, writeFile } from 'fs/promises';
console.log("url", import.meta.url);

// read file
let filepath = new URL("./index.html", import.meta.url)
let contents = await readFile(filepath, { encoding: 'utf8' });

// console.log("file path", contents);

// write file
const data = {
    title: "my custom title",
    body: "my custom data"
}

for (const [key, value] of Object.entries(data)) {
    contents = contents.replace(`{${key}}`, value)
}
await writeFile(new URL("./index.html", import.meta.url), contents)
