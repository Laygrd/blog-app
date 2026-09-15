const firstCharToUppercase = require('../helpers/firstCharToUppercase');

module.exports = (layer, sliceName) => {
    const componentName = firstCharToUppercase(sliceName);

    return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${componentName}>;

const Template: ComponentStory<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
`};
