import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8').trim();

test('compare flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const normalize = (str) => str.replace(/\s+/g, ' ').trim();

  expect(normalize(genDiff(filepath1, filepath2))).toBe(normalize(expected));
});

test('compare flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const normalize = (str) => str.replace(/\s+/g, ' ').trim();

  expect(normalize(genDiff(filepath1, filepath2))).toBe(normalize(expected));
});

test('compare nested JSON/YAML files with stylish', () => {
  const expected = readFileSync(getFixturePath('expected_nested.txt'), 'utf-8').trim();

  const j1 = getFixturePath('file1.json');
  const j2 = getFixturePath('file2.json');
  expect(genDiff(j1, j2).trim()).toBe(expected);

  const y1 = getFixturePath('file1.yml');
  const y2 = getFixturePath('file2.yml');
  expect(genDiff(y1, y2).trim()).toBe(expected);
});
