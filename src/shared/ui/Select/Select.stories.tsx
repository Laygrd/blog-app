import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select, SelectTheme } from './Select';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';


export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ]
};

export const PrimaryLabelled = Template.bind({});
PrimaryLabelled.args = {
    label: 'label1',
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ]
};

export const Underline = Template.bind({});
Underline.args = {
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ],
    theme: SelectTheme.UNDERLINE
};

export const UnderlineLabelled = Template.bind({});
UnderlineLabelled.args = {
    label: 'label1',
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ],
    theme: SelectTheme.UNDERLINE
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ]
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const PrimaryLabelledDark = Template.bind({});
PrimaryLabelledDark.args = {
    label: 'label1',
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ]
};
PrimaryLabelledDark.decorators = [ThemeDecorator(Theme.DARK)]

export const UnderlineDark = Template.bind({});
UnderlineDark.args = {
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ],
    theme: SelectTheme.UNDERLINE
};
UnderlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const UnderlineLabelledDark = Template.bind({});
UnderlineLabelledDark.args = {
    label: 'label1',
    options: [
        {value: 'value1', content: 'option1'},
        {value: 'value2', content: 'option2'},
        {value: 'value3', content: 'option3'}
    ],
    theme: SelectTheme.UNDERLINE
};
UnderlineLabelledDark.decorators = [ThemeDecorator(Theme.DARK)]