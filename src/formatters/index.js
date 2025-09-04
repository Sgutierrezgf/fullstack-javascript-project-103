import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatDiff = (diffTree, formatName) => {
    switch (formatName) {
        case 'stylish':
            return formatStylish(diffTree);
        case 'plain':
            return formatPlain(diffTree);
        case 'json':
            return formatJson(diffTree);
        default:
            throw new Error(`Formato desconocido: ${formatName}`);
    }
};

export default formatDiff;
