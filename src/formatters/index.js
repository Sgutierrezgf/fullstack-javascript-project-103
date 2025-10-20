import formatStylish from './stylish';
import formatPlain from './plain';
import formatJson from './json';

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
