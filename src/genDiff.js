import _ from "lodash";

const genDiff = (data1, data2) => {
    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const lines = keys.flatMap((key) => {
        if (_.has(data1, key) && !_.has(data2, key)) {
            return `  - ${key}: ${data1[key]}`;
        }
        if (!_.has(data1, key) && _.has(data2, key)) {
            return `  + ${key}: ${data2[key]}`;
        }
        if (data1[key] !== data2[key]) {
            return [
                `  - ${key}: ${data1[key]}`,
                `  + ${key}: ${data2[key]}`,
            ];
        }
        return `    ${key}: ${data1[key]}`;
    });

    return `{\n${lines.join("\n")}\n}`;
};

export default genDiff;
