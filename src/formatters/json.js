const formatJson = (diffTree) => {
    return JSON.stringify(diffTree, null, 2); // 2 espacios de indentación
};

export default formatJson;
