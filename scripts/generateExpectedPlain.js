import fs from 'fs';
import path from 'path';
import genDiff from '../src/genDiff';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

// Rutas a los archivos
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

// Generar el diff en formato 'plain'
const diff = genDiff(filepath1, filepath2, 'plain');

// Guardar el resultado en expected_plain.txt
fs.writeFileSync(getFixturePath('expected_plain.txt'), diff);

console.log('✅ expected_plain.txt generado correctamente');
