// debug-genDiff.mjs
import fs from 'fs';
import path from 'path';
import gendiff from './src/genDiff.js';

const fixtures = (name) => path.resolve(process.cwd(), '__fixtures__', name);

const files = [
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yml'],
];

for (const [a, b] of files) {
    const p1 = fixtures(a);
    const p2 = fixtures(b);
    console.log('='.repeat(80));
    console.log(`GENERATED for ${a} vs ${b}:\n`);
    console.log(gendiff(p1, p2));
    console.log('='.repeat(80) + '\n\n');
}

// Si tienes un archivo expected (result_stylish.txt) intenta imprimirlo también:
const expectedPath = fixtures('result_stylish.txt');
if (fs.existsSync(expectedPath)) {
    console.log('EXPECTED (result_stylish.txt):\n');
    console.log(fs.readFileSync(expectedPath, 'utf8'));
}
