import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox, ListBoxTheme } from './ListBox';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox { ...args } />;

const items = [
    { value: '1', content: 'Durward Reynolds', disabled: false },
    { value: '2', content: 'Kenton Towne', disabled: false },
    { value: '3', content: 'Therese Wunsch', disabled: false },
    { value: '4', content: 'Benedict Kessler', disabled: true },
    { value: '5', content: 'Katelyn Rohan', disabled: false },
]

export const Default = Template.bind({});
Default.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
Default.decorators = [ThemeDecorator(Theme.LIGHT)]

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Underline = Template.bind({});
Underline.args = {
    theme: ListBoxTheme.UNDERLINE,
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
Underline.decorators = [ThemeDecorator(Theme.LIGHT)]

export const UnderlineDark = Template.bind({});
UnderlineDark.args = {
    theme: ListBoxTheme.UNDERLINE,
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
UnderlineDark.decorators = [ThemeDecorator(Theme.DARK)]

