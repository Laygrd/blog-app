import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CurrencySelect } from './CurrencySelect';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ListBoxTheme } from 'shared/ui/ListBox/ListBox';

export default {
    title: 'entities/Currency/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

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

