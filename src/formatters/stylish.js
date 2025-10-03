import _ from "lodash";

const INDENT_SIZE = 4;

const getIndent = (depth) => ' '.repeat(depth * INDENT_SIZE - 2);
const getBracketIndent = (depth) => ' '.repeat((depth - 1) * INDENT_SIZE);

const stringify = (value, depth) => {
    if (!_.isObject(value)) {
        return String(value);
    }

    const entries = Object.entries(value).map(
        ([key, val]) => `${' '.repeat(depth * INDENT_SIZE)}${key}: ${stringify(val, depth + 1)}`
    );

    return `{\n${entries.join('\n')}\n${getBracketIndent(depth + 1)}}`;
};

const formatStylish = (tree, depth = 1) => {
    const lines = tree.flatMap((node) => {
        switch (node.type) {
            case 'added':
                return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'removed':
                return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'unchanged':
                return `${' '.repeat(depth * INDENT_SIZE)}${node.key}: ${stringify(node.value, depth + 1)}`;
            case 'updated':
                return [
                    `${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
                    `${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
                ];
            case 'nested':
                return `${' '.repeat(depth * INDENT_SIZE)}${node.key}: ${formatStylish(node.children, depth + 1)}`;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    });

    return `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`;
};

export default formatStylish;
