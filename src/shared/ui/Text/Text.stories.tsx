import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text, TextAlign, TextSize, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';


export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'title',
    text: 'text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'title',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];


export const Error = Template.bind({});
Error.args = {
    theme: TextTheme.ERROR,
    title: 'title',
    text: 'text',
};
Error.decorators = [];


export const Inverted = Template.bind({});
Inverted.args = {
    theme: TextTheme.INVERTED,
    title: 'title',
    text: 'text',
};
Inverted.decorators = [];

// align

export const PrimaryLeftAlign = Template.bind({});
PrimaryLeftAlign.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.LEFT
};

export const PrimaryCenterAlign = Template.bind({});
PrimaryCenterAlign.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.CENTER
};

export const PrimaryRightAlign = Template.bind({});
PrimaryRightAlign.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.RIGHT
};

// size 

export const SizeS = Template.bind({});
SizeS.args = {
    title: 'title',
    text: 'text',
    size: TextSize.S
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'title',
    text: 'text',
    size: TextSize.M
};

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'title',
    text: 'text',
    size: TextSize.L
};

export const SizeXL = Template.bind({});
SizeXL.args = {
    title: 'title',
    text: 'text',
    size: TextSize.XL
};