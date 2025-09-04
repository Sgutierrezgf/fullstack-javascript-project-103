import _ from 'lodash';

const isObject = (val) => _.isPlainObject(val);

const indent = (depth) => ' '.repeat(depth * 4 - 2);
const innerIndent = (depth) => ' '.repeat(depth * 4);
const bracketIndent = (depth) => ' '.repeat((depth - 1) * 4);

const stringify = (value, depth) => {
    if (!isObject(value)) {
        return String(value);
    }
    const lines = Object.entries(value)
        .map(([k, v]) => `${innerIndent(depth + 1)}${k}: ${stringify(v, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${bracketIndent(depth + 1)}}`;
};

const iter = (node, depth) => {
    switch (node.type) {
        case 'added':
            return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'removed':
            return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
            return `${bracketIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'updated':
        case 'changed':
            return [
                `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
                `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
            ].join('\n');
        case 'nested': {
            const children = node.children.map((child) => iter(child, depth + 1)).join('\n');
            return `${bracketIndent(depth)}  ${node.key}: {\n${children}\n${bracketIndent(depth)}  }`;
        }
        default:
            throw new Error(`Unknown node type: ${node.type}`);
    }
};

export default (ast) => {
    const lines = ast.map((node) => iter(node, 1)).join('\n');
    return `{\n${lines}\n}`;
};
