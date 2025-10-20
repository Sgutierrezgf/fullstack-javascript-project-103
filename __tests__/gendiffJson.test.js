import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('compare JSON files with json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const diff = genDiff(filepath1, filepath2, 'json');

  const expected = fs.readFileSync(getFixturePath('expected_json.json'), 'utf-8').trim();
  expect(diff).toBe(expected);
});
