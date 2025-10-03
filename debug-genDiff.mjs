// debug-compare.mjs
import fs from 'fs';
import path from 'path';
import gendiff from './src/genDiff.js';

const fixtures = (name) => path.resolve(process.cwd(), '__fixtures__', name);
const expectedPath = fixtures('result_stylish.txt'); // nombre habitual; ajusta si se llama distinto

const pJson1 = fixtures('file1.json');
const pJson2 = fixtures('file2.json');
const pYml1 = fixtures('file1.yml');
const pYml2 = fixtures('file2.yml');

const printDiff = (label, generated, expected) => {
    console.log('='.repeat(80));
    console.log(label);
    console.log('---- GENERATED ----');
    console.log(generated);
    console.log('---- EXPECTED ----');
    console.log(expected);
    console.log('---- FIRST DIFFERENCE (context) ----');
    const max = Math.max(generated.length, expected.length);
    let i = 0;
    for (; i < max; i++) {
        if (generated[i] !== expected[i]) break;
    }
    if (i === max) {
        console.log('No differences found (exact match).');
        return;
    }
    const start = Math.max(0, i - 40);
    const end = Math.min(max, i + 40);
    console.log('pos:', i);
    console.log('...expected context...');
    console.log(expected.slice(start, end).replace(/\n/g, '\\n'));
    console.log('...generated context...');
    console.log(generated.slice(start, end).replace(/\n/g, '\\n'));
    console.log('='.repeat(80));
};

const genJson = gendiff(pJson1, pJson2);
const genYml = gendiff(pYml1, pYml2);

let expected = '';
if (fs.existsSync(expectedPath)) {
    expected = fs.readFileSync(expectedPath, 'utf8');
} else {
    // fallback: try fixture file that tests read (result_stylish.txt sometimes named differently)
    const alt = fixtures('result_stylish.txt');
    if (fs.existsSync(alt)) expected = fs.readFileSync(alt, 'utf8');
}

console.log('=== JSON pair ===');
if (expected) printDiff('JSON comparison', genJson, expected);
else {
    console.log('No expected file result_stylish.txt found; printing generated output:');
    console.log(genJson);
}

console.log('\n=== YAML pair ===');
if (expected) printDiff('YAML comparison', genYml, expected);
else {
    console.log('No expected file result_stylish.txt found; printing generated output:');
    console.log(genYml);
}
