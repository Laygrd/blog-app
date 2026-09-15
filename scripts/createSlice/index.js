/* 
    ----- CREATE SLICE SCRIPT -----

        Description: 
            Generates a slice with a pre-defined template structure 
            in one of the project layers: features / entites / pages.

            Templates include corresponding folders:
             - ui: react component with slice name, styles, tests and storybook files
             - model: redux slice with tests, type folder with schema template 

        Usage:
            npm run generate:slice <layer> <slice_name>


*/

const createTemplate = require('./templates/createTemplate');

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ['features', 'entites', 'pages']

if (!layer || !layers.includes(layer)) {
    throw new Error(`Specify layer name: '${layers.join('\' or \'')}'\n\n\tnpm run generate:slice <layer> <slice_name>\n`)
}

if (!sliceName) {
    throw new Error(`Specify slice name: \n\n\tnpm run generate:slice ${layer} <slice_name>\n`)
}

createTemplate(layer, sliceName);