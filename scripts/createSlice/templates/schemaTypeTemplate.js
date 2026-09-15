const firstCharToUppercase = require('../helpers/firstCharToUppercase');

module.exports = (sliceName) => {
    const schemaName = firstCharToUppercase(sliceName);

    return `export interface ${schemaName}Schema {

}`}