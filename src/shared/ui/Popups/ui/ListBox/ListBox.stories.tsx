import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListBox, ListBoxTheme } from './ListBox';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Popups/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 300}}><Story /></div>
    ]
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox { ...args } />;

const items = [
    { value: '1', content: 'Durward Reynolds', disabled: false },
    { value: '2', content: 'Kenton Towne', disabled: false },
    { value: '3', content: 'Therese Wunsch', disabled: false },
    { value: '4', content: 'Benedict Kessler', disabled: true },
    { value: '5', content: 'Katelyn Rohan', disabled: false },
]

export const Primary = Template.bind({});
Primary.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
Primary.decorators = [ThemeDecorator(Theme.LIGHT)]

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...'
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

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


export const PrimaryTopDirection = Template.bind({});
PrimaryTopDirection.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...',
    direction: 'top left',
};
PrimaryTopDirection.decorators = [ThemeDecorator(Theme.LIGHT)]

export const PrimaryWithLabel = Template.bind({});
PrimaryWithLabel.args = {
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...',
    label: 'some label'
};
PrimaryWithLabel.decorators = [ThemeDecorator(Theme.LIGHT)]

export const UnderlineWithLabel = Template.bind({});
UnderlineWithLabel.args = {
    theme: ListBoxTheme.UNDERLINE,
    items: items,
    onChange: (vlaue) => {},
    defaultValue: 'Choose one...',
    label: 'some label'
};
UnderlineWithLabel.decorators = [ThemeDecorator(Theme.LIGHT)]