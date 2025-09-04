import fs from 'fs';
import path from 'path';
import buildDiffTree from './buildDiffTree.js';
import parse from './parser.js';
import formatDiff from './formatters/index.js';

const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileData = (filepath) => fs.readFileSync(getFilePath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const file1 = getFileData(filepath1);
    const file2 = getFileData(filepath2);

    const ext1 = path.extname(filepath1).slice(1);
    const ext2 = path.extname(filepath2).slice(1);

    const data1 = parse(file1, ext1);
    const data2 = parse(file2, ext2);

    const diffTree = buildDiffTree(data1, data2);

    return formatDiff(diffTree, format);
};

export default genDiff;
