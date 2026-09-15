const firstCharToUppercase = require('../helpers/firstCharToUppercase');

module.exports = (sliceName) => {
    const styleName = firstCharToUppercase(sliceName);

    return `.${styleName} {

}`};
