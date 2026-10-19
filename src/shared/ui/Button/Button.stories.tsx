import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';


export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'text',
    theme: ButtonTheme.CLEAR
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'text',
    theme: ButtonTheme.CLEAR_INVERTED
};

export const Icon = Template.bind({});
Icon.args = {
    children: 'icon',
    theme: ButtonTheme.ICON
};

export const Background = Template.bind({});
Background.args = {
    children: 'text',
    theme: ButtonTheme.BACKGROUND
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'text',
    theme: ButtonTheme.BACKGROUND_INVERTED
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE
};

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE_INVERTED
};

export const SquareM = Template.bind({});
SquareM.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_M
};

export const SquareL = Template.bind({});
SquareL.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_L
};

export const SquareXL = Template.bind({});
SquareXL.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_XL
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.SIZE_M,
    disabled: true,
};

// same but with dark theme

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'text',
    theme: ButtonTheme.CLEAR
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearInvertedDark = Template.bind({});
ClearInvertedDark.args = {
    children: 'text',
    theme: ButtonTheme.CLEAR_INVERTED
};
ClearInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const IconDark = Template.bind({});
IconDark.args = {
    children: 'icon',
    theme: ButtonTheme.ICON
};
IconDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundDark = Template.bind({});
BackgroundDark.args = {
    children: 'text',
    theme: ButtonTheme.BACKGROUND
};
BackgroundDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedDark = Template.bind({});
BackgroundInvertedDark.args = {
    children: 'text',
    theme: ButtonTheme.BACKGROUND_INVERTED
};
BackgroundInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineInvertedDark = Template.bind({});
OutlineInvertedDark.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE_INVERTED
};
OutlineInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareMDark = Template.bind({});
SquareMDark.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_M
};
SquareMDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareLDark = Template.bind({});
SquareLDark.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_L
};
SquareLDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SquareXLDark = Template.bind({});
SquareXLDark.args = {
    children: 'B',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.SIZE_XL
};
SquareXLDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    children: 'text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.SIZE_M,
    disabled: true,
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];