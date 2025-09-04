import parse from './parser.js';
import fs from 'fs';
import path from 'path';
import formatStylish from "./formatters/stylish.js";


const getData = (filepath) => {
    const ext = path.extname(filepath).slice(1);
    const data = fs.readFileSync(filepath, 'utf-8');
    return parse(data, ext);
};

const buildDiff = (obj1, obj2) => {
    const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

    return keys.map((key) => {
        if (!Object.hasOwn(obj2, key)) {
            return { key, type: 'removed', value: obj1[key] };
        }
        if (!Object.hasOwn(obj1, key)) {
            return { key, type: 'added', value: obj2[key] };
        }
        if (typeof obj1[key] === 'object' && obj1[key] !== null
            && typeof obj2[key] === 'object' && obj2[key] !== null) {
            return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
        }
        if (obj1[key] !== obj2[key]) {
            return { key, type: 'updated', oldValue: obj1[key], newValue: obj2[key] };
        }
        return { key, type: 'unchanged', value: obj1[key] };
    });
};

const genDiff = (filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const diffTree = buildDiff(data1, data2);
    return formatStylish(diffTree);
};


export default genDiff;
