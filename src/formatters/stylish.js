import _ from 'lodash';

const SPACES_COUNT = 4;

const getIndent = (depth) => ' '.repeat(depth * SPACES_COUNT - 2);
const getBracketIndent = (depth) => ' '.repeat((depth - 1) * SPACES_COUNT);


const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) {
        return String(value);
    }

    const entries = Object
        .entries(value)
        .map(([key, val]) => `${' '.repeat(depth * SPACES_COUNT)}${key}: ${stringify(val, depth + 1)}`);

    return `{\n${entries.join('\n')}\n${getBracketIndent(depth)}}`;
};

const formatStylish = (tree) => {
    const iter = (nodes, depth) => {
        const lines = nodes.flatMap((node) => {
            const { key, type } = node;

            switch (type) {
                case 'nested':
                    return `${getIndent(depth)}  ${key}: ${iter(node.children, depth + 1)}`;
                case 'added':
                    return `${getIndent(depth)}+ ${key}: ${stringify(node.value, depth + 1)}`;
                case 'removed':
                    return `${getIndent(depth)}- ${key}: ${stringify(node.value, depth + 1)}`;
                case 'unchanged':
                    return `${getIndent(depth)}  ${key}: ${stringify(node.value, depth + 1)}`;
                case 'changed':
                case 'updated':
                    return [
                        `${getIndent(depth)}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
                        `${getIndent(depth)}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
                    ];
                default:
                    throw new Error(`Unknown node type: ${type}`);
            }
        });

        return `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`;
    };

    return iter(tree, 1);
};

export default formatStylish;