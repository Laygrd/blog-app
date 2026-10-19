import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input, InputTheme } from './Input';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';


export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// states : disabled, empty, placeholder
// styles: default, clear, underline

// theme - state - dark/light
export const PrimaryEmpty = Template.bind({});
PrimaryEmpty.args = {
    id: "primary-empty",
};

export const PrimaryPlaceholder = Template.bind({});
PrimaryPlaceholder.args = {
    id: "primary-placeholder",
    placeholder: 'placeholder',
};


export const PrimaryEmptyDark = Template.bind({});
PrimaryEmptyDark.args = {
    id: "primary-empty-dark",
};
PrimaryEmptyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryPlaceholderDark = Template.bind({});
PrimaryPlaceholderDark.args = {
    id: "primary-placeholder-dark",
    placeholder: 'placeholder',
};
PrimaryPlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryReadonly = Template.bind({});
PrimaryReadonly.args = {
    id: "primary-Readonly",
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true,
};

export const PrimaryReadonlyDark = Template.bind({});
PrimaryReadonlyDark.args = {
    id: "primary-readonly-dark",
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true,
};
PrimaryReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearEmpty = Template.bind({});
ClearEmpty.args = {
    id: "clear-empty",
    theme: InputTheme.CLEAR
};

export const ClearPlaceholder = Template.bind({});
ClearPlaceholder.args = {
    id: "clear-placeholder",
    placeholder: 'placeholder',
    theme: InputTheme.CLEAR
};

export const ClearReadonly = Template.bind({});
ClearReadonly.args = {
    id: "clear-readonly",
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true,
    theme: InputTheme.CLEAR
};

export const ClearEmptyDark = Template.bind({});
ClearEmptyDark.args = {
    id: "clear-empty-dark",
    theme: InputTheme.CLEAR
};
ClearEmptyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearPlaceholderDark = Template.bind({});
ClearPlaceholderDark.args = {
    id: "clear-placeholder-dark",
    placeholder: 'placeholder',
    theme: InputTheme.CLEAR
};
ClearPlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearReadonlyDark = Template.bind({});
ClearReadonlyDark.args = {
    id: "clear-readonly-dark",
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true,
    theme: InputTheme.CLEAR
};
ClearReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];

export const UnderlineEmpty = Template.bind({});
UnderlineEmpty.args = {
    id: "underline-empty",
    theme: InputTheme.UNDERLINE
};

export const UnderlineEmptyDark = Template.bind({});
UnderlineEmptyDark.args = {
    id: "underline-empty-dark",
    theme: InputTheme.UNDERLINE
};
UnderlineEmptyDark.decorators = [ThemeDecorator(Theme.DARK)]

export const UnderlinePlaceholder = Template.bind({});
UnderlinePlaceholder.args = {
    id: "underline-placeholder",
    theme: InputTheme.UNDERLINE,
    placeholder: 'placeholder',
    value: 'sometext',
};

export const UnderlinePlaceholderDark = Template.bind({});
UnderlinePlaceholderDark.args = {
    id: "underline-placeholder-dark",
    theme: InputTheme.UNDERLINE,
    placeholder: 'placeholder',
    value: 'sometext',
};
UnderlinePlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)]

export const UnderlineReadonly = Template.bind({});
UnderlineReadonly.args = {
    id: "underline-readonly",
    theme: InputTheme.UNDERLINE,
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true,
};

export const UnderlineReadonlyDark = Template.bind({});
UnderlineReadonlyDark.args = {
    id: "underline-readonly-dark",
    theme: InputTheme.UNDERLINE,
    placeholder: 'placeholder',
    value: 'sometext',
    readOnly: true
};
UnderlineReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)]