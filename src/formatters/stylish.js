import _ from "lodash";

const INDENT_SIZE = 4;

const indent = (depth) => ' '.repeat(depth * INDENT_SIZE - 2);
const bracketIndent = (depth) => ' '.repeat((depth - 1) * INDENT_SIZE);

const stringify = (value, depth = 1) => {
    if (value === null || typeof value !== 'object') {
        return String(value);
    }
    const entries = Object.entries(value)
        .map(([k, v]) => `${' '.repeat(depth * INDENT_SIZE)}${k}: ${stringify(v, depth + 1)}`);
    return ['{', ...entries, `${bracketIndent(depth)}}`].join('\n');
};

const formatStylish = (tree, depth = 1) => {
    const lines = tree.flatMap((node) => {
        const name = node.key;
        switch (node.type) {
            case 'nested':
                return `${' '.repeat(depth * INDENT_SIZE)}${name}: ${formatStylish(node.children, depth + 1)}`;
            case 'added':
                return `${indent(depth)}+ ${name}: ${stringify(node.value, depth + 1)}`;
            case 'removed':
                return `${indent(depth)}- ${name}: ${stringify(node.value, depth + 1)}`;
            case 'unchanged':
                return `${' '.repeat(depth * INDENT_SIZE)}${name}: ${stringify(node.value, depth + 1)}`;
            case 'changed':
                return [
                    `${indent(depth)}- ${name}: ${stringify(node.oldValue, depth + 1)}`,
                    `${indent(depth)}+ ${name}: ${stringify(node.newValue, depth + 1)}`
                ];
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    });
    return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
};

export default formatStylish;
