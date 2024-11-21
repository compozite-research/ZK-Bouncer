const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'node_modules/@anon-aadhaar/core/src/storage.ts');
let content = fs.readFileSync(storagePath, 'utf8');
content = content.replace('import localforage from', 'import * as localforage from');
fs.writeFileSync(storagePath, content);