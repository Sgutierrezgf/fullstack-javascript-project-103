import _ from "lodash";

const SPACES_COUNT = 4;

const makeIndent = (depth) => " ".repeat(depth * SPACES_COUNT - 2);
const makeBracketIndent = (depth) => " ".repeat((depth - 1) * SPACES_COUNT);

const stringify = (data, depth) => {
    if (!_.isPlainObject(data)) {
        return String(data);
    }
    const entries = Object.entries(data).map(
        ([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
    );
    return `{\n${entries.join("\n")}\n${makeBracketIndent(depth + 1)}}`;
};

const formatStylish = (tree, depth = 1) => {
    const lines = tree.map((node) => {
        switch (node.type) {
            case "removed":
                return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
            case "added":
                return `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
            case "updated":
                return [
                    `${makeIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
                    `${makeIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
                ].join("\n");
            case "unchanged":
                return `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
            case "nested":
                return `${makeIndent(depth)}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return `{\n${lines.join("\n")}\n${makeBracketIndent(depth)}}`;
};

export default formatStylish;
