import parse from "./parser.js";

const genDiff = (filepath1, filepath2) => {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort();

    const result = keys.map((key) => {
        if (!Object.hasOwn(data2, key)) {
            return `  - ${key}: ${data1[key]}`;
        }
        if (!Object.hasOwn(data1, key)) {
            return `  + ${key}: ${data2[key]}`;
        }
        if (data1[key] !== data2[key]) {
            return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
        }
        return `    ${key}: ${data1[key]}`;
    });

    return `{\n${result.join("\n")}\n}`;
};

export default genDiff;
