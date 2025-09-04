import parse from './parser.js';
import fs from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import formatDiff from './formatters/index.js';

const getData = (filepath) => {
    const ext = path.extname(filepath).slice(1); // <-- extensión 'json' o 'yml'
    const data = fs.readFileSync(filepath, 'utf-8'); // contenido del archivo
    return parse(data, ext); // <-- pasar la extensión correcta
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
    const obj1 = getData(filepath1);
    const obj2 = getData(filepath2);

    const diffTree = buildDiffTree(obj1, obj2);

    return formatDiff(diffTree, formatName);
};

export default genDiff;
