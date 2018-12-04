const path = require('path');
const fs = require('fs');
const dirPath = path.join(__dirname + '/../out/text/');
const input_file = path.join(dirPath + 'input.txt');
const dst_file = path.join(dirPath + 'dst.txt');

try {
    if (!fs.statSync(dst_file)) {
        console.log('file has not exitst');
        return;
    }
    if (input_file == null) {
        console.log('file has not content');
        return;
    }
    fs.appendFileSync(dst_file, fs.readFileSync(input_file), 'utf8');
    console.log(fs.readFileSync(dst_file,'utf8'));
} catch (err) {
    if (err.code !== 'ENOENT') {
        console.log('ENOENT');
        throw err;
    }
    fs.writeFileSync(path.join(dirPath + 'dst.txt'), '', 'utf8');
    console.log('create dst file');
}