const fs = require('fs/promises');
const firstCharToUppercase = require('../helpers/firstCharToUppercase');
const resolveRootPath = require('../helpers/resolveRootPath');
const reduxSliceTemplate = require('./reduxSliceTemplate');
const schemaTypeTemplate = require('./schemaTypeTemplate');

module.exports = async (layer, sliceName) => {
    const resolveModelPath = (...segments) => resolveRootPath('src', layer, sliceName, 'model', ...segments);

    const createModelStructure = async () => {
        try {
            await fs.mkdir(resolveModelPath());
            await fs.mkdir(resolveModelPath('types'));
            await fs.mkdir(resolveModelPath('slice'));
            await fs.mkdir(resolveModelPath('selectors'));
            await fs.mkdir(resolveModelPath('services'));
        } catch (e) {
            console.log(`Failed to create model dir for slice ${sliceName}: \n\n${e.message}`);
        }
    };

    const createReduxSlice = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('slice', `${sliceName}Slice.ts`),
                reduxSliceTemplate(sliceName),
            );
        } catch (e) {
            console.log(`Failed to create redux slice: \n\n${e.message}`);
        }
    };

    const createSchemaType = async () => {
        try {
            await fs.writeFile(
                resolveModelPath('types', `${firstCharToUppercase(sliceName)}Schema.ts`),
                schemaTypeTemplate(sliceName),
            );
        } catch (e) {
            console.log(`Failed to create schema file: \n\n${e.message}`);
        }
    };

    await createModelStructure();
    await createReduxSlice();
    await createSchemaType();
};