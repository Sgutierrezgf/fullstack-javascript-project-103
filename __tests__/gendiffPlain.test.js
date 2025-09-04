import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/genDiff.js';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test("compare nested JSON/YAML files with plain format", () => {
    const expected = readFileSync(getFixturePath("expected_plain.txt"), "utf-8").trim();

    const j1 = getFixturePath("file1.json");
    const j2 = getFixturePath("file2.json");
    expect(genDiff(j1, j2, 'plain').trim()).toBe(expected);

    const y1 = getFixturePath("file1.yml");
    const y2 = getFixturePath("file2.yml");
    expect(genDiff(y1, y2, 'plain').trim()).toBe(expected);
});