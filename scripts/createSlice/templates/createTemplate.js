const fs = require('fs/promises');
const resolveRootPath = require('../helpers/resolveRootPath');

const createModel = require('../templates/createModel');
const createUI = require('../templates/createUI');
const createPublicApi = require('../templates/createPublicApi');

module.exports = async (layer, sliceName) => {

    try {
        await fs.mkdir(resolveRootPath('src', layer, sliceName))
    } catch (e) {
        console.log(`Failed to create slice directory for ${sliceName}: \n\n${e.message}`)
    }

    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    await createPublicApi(layer, sliceName);
};
