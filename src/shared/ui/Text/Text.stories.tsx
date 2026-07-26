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

export const WithTitleAndText = Template.bind({});
WithTitleAndText.args = {
    title: 'title',
    text: 'text',
};

export const WithOnlyTitle = Template.bind({});
WithOnlyTitle.args = {
    title: 'title',
};

export const WithOnlyText = Template.bind({});
WithOnlyText.args = {
    text: 'text',
};

export const WithTitleAndTextDark = Template.bind({});
WithTitleAndTextDark.args = {
    title: 'title',
    text: 'text',
};
WithTitleAndTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithOnlyTitleDark = Template.bind({});
WithOnlyTitleDark.args = {
    title: 'title',
};
WithOnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithOnlyTextDark = Template.bind({});
WithOnlyTextDark.args = {
    text: 'text',
};
WithOnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];


export const ErrorWithTitleAndText = Template.bind({});
ErrorWithTitleAndText.args = {
    theme: TextTheme.ERROR,
    title: 'title',
    text: 'text',
};
ErrorWithTitleAndText.decorators = [];

export const ErrorWithOnlyTitle = Template.bind({});
ErrorWithOnlyTitle.args = {
    theme: TextTheme.ERROR,
    title: 'title',
};
ErrorWithOnlyTitle.decorators = [];

export const ErrorWithOnlyText = Template.bind({});
ErrorWithOnlyText.args = {
    theme: TextTheme.ERROR,
    text: 'text',
};
ErrorWithOnlyText.decorators = [];


export const InvertedWithTitleAndText = Template.bind({});
InvertedWithTitleAndText.args = {
    theme: TextTheme.INVERTED,
    title: 'title',
    text: 'text',
};
InvertedWithTitleAndText.decorators = [];

export const InvertedWithOnlyTitle = Template.bind({});
InvertedWithOnlyTitle.args = {
    theme: TextTheme.INVERTED,
    title: 'title',
};
InvertedWithOnlyTitle.decorators = [];

export const InvertedWithOnlyText = Template.bind({});
InvertedWithOnlyText.args = {
    theme: TextTheme.INVERTED,
    text: 'text',
};
InvertedWithOnlyText.decorators = [];

// align

export const LeftAlign = Template.bind({});
LeftAlign.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.LEFT
};

export const CenterAlign = Template.bind({});
CenterAlign.args = {
    title: 'title',
    text: 'text',
    align: TextAlign.CENTER
};

export const RightAlign = Template.bind({});
RightAlign.args = {
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