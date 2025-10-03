import _ from "lodash";

const INDENT_SIZE = 4;

const makeIndent = (depth, sign = ' ') =>
    ' '.repeat(depth * INDENT_SIZE - 2) + sign + ' ';

const stringify = (value, depth) => {
    if (!_.isObject(value)) {
        return value === null ? 'null' : String(value);
    }

    const entries = Object.entries(value).map(
        ([key, val]) =>
            `${' '.repeat(depth * INDENT_SIZE)}${key}: ${stringify(val, depth + 1)}`
    );

    const closingIndent = ' '.repeat(depth * INDENT_SIZE - INDENT_SIZE);
    return `{\n${entries.join('\n')}\n${closingIndent}}`;
};

const formatStylish = (tree, depth = 1) => {
    const lines = tree.flatMap((node) => {
        switch (node.type) {
            case 'added':
                return `${makeIndent(depth, '+')}${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'removed':
                return `${makeIndent(depth, '-')}${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'unchanged':
                return `${makeIndent(depth)}${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'updated':
                return [
                    `${makeIndent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth + 1)}`,
                    `${makeIndent(depth, '+')}${node.key}: ${stringify(node.newValue, depth + 1)}`
                ];
            case 'nested':
                return `${makeIndent(depth)}${node.key}: ${formatStylish(node.children, depth + 1)}`;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    const closingIndent = ' '.repeat(depth * INDENT_SIZE - INDENT_SIZE);
    return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default formatStylish;