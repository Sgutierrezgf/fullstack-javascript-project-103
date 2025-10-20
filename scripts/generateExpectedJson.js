import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

// Generar expected_json.txt usando formato JSON
const diffJSON = genDiff(file1, file2, 'json');
writeFileSync(getFixturePath('expected_json.json'), diffJSON);
console.log('✅ expected_json.txt generado correctamente');
