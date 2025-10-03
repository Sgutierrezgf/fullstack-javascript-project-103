import _ from "lodash";

const indent = (depth, spacesCount = 4) => {
    const count = depth * spacesCount - 2;
    return " ".repeat(Math.max(0, count));
};

const stringify = (data, depth) => {
    if (!_.isPlainObject(data)) {
        return String(data);
    }
    const entries = Object.entries(data).map(
        ([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
    );
    const closingIndent = indent(depth);
    return `{\n${entries.join("\n")}\n${closingIndent}  }`;
};

const formatStylish = (tree, depth = 1) => {
    const lines = tree.map((node) => {
        switch (node.type) {
            case "removed":
                return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
            case "added":
                return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
            case "updated":
                return [
                    `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
                    `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
                ].join("\n");
            case "unchanged":
                return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
            case "nested":
                return `${indent(depth)}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return `{\n${lines.join("\n")}\n${indent(depth - 1)}  }`;
};

export default formatStylish;
