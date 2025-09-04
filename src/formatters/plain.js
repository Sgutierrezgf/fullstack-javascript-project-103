const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val);

const valueToString = (value) => {
    if (isObject(value)) return '[complex value]';
    if (typeof value === 'string') return `'${value}'`;
    return String(value);
};

const makePlain = (diffTree, path = '') => {
    const lines = diffTree.flatMap((node) => {
        const property = path ? `${path}.${node.key}` : node.key;

        switch (node.type) {
            case 'added':
                return `Property '${property}' was added with value: ${valueToString(node.value)}`;
            case 'removed':
                return `Property '${property}' was removed`;
            case 'updated':
                return `Property '${property}' was updated. From ${valueToString(node.oldValue)} to ${valueToString(node.newValue)}`;
            case 'nested':
                return makePlain(node.children, property);
            case 'unchanged':
                return [];
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return lines.join('\n');
};

export default makePlain;
