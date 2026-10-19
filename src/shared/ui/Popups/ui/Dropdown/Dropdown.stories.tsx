/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Button, ButtonTheme } from '../../../Button/Button';
import { Dropdown } from './Dropdown';


export default {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 300}}><Story /></div>
    ]
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown { ...args } />;

const trigger = <Button theme={ButtonTheme.OUTLINE}>Menu</Button>;
const items = [
    {
        content: 'New',
        onClick: () => {},
        disabled: false,
        href: undefined
    },
    {
        content: 'Open',
        onClick: () => {},
        disabled: true,
        href: undefined
    },
    {
        content: 'Save',
        onClick: () => {},
        disabled: false,
        href: undefined
    }
];

export const Primary = Template.bind({});
Primary.args = {
    items,
    trigger,
};
Primary.decorators = [];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    items,
    trigger,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryTopDirection = Template.bind({});
PrimaryTopDirection.args = {
    items,
    trigger,
    direction: 'top left',
};
PrimaryTopDirection.decorators = [];