const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, 'node_modules/@anon-aadhaar/core/src/storage.ts');
let content = fs.readFileSync(storagePath, 'utf8');
content = content.replace('import localforage from', 'import * as localforage from');
fs.writeFileSync(storagePath, content);


/*
    "build": "rm -rf dist && tsc",
    "exec": "node --experimental-specifier-resolution=node dist/index.js",
    "start": "react-scripts build && react-scripts start",
    "dev": "nodemon src/index.ts",
*/