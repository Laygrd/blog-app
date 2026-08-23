import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CountrySelect } from './CountrySelect';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { SelectTheme } from 'shared/ui/Select/Select';
import { ListBoxTheme } from 'shared/ui/ListBox/ListBox';

export default {
    title: 'entities/Country/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Underline = Template.bind({});
Underline.args = {
    theme: ListBoxTheme.UNDERLINE
};

export const UnderlineDark = Template.bind({});
UnderlineDark.args = {
    theme: ListBoxTheme.UNDERLINE
};
UnderlineDark.decorators = [ThemeDecorator(Theme.DARK)]