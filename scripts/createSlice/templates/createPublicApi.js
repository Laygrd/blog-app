const fs = require('fs/promises');
const resolveRootPath = require('../helpers/resolveRootPath');
const firstCharToUppercase = require('../helpers/firstCharToUppercase');

module.exports = async (layer, sliceName) => {
    const componentName = firstCharToUppercase(sliceName)
    const schemaName = `${componentName}Schema`;

    try {
        await fs.writeFile(
            resolveRootPath('src', layer, sliceName, 'index.ts'),
            `export { ${schemaName} } from './model/types/${schemaName}';
export { ${componentName} } from './ui/${componentName}/${componentName}';
`)
    } catch (e) {
        console.log(`Failed to create public api file: \n\n${e.message}`);
    }
}