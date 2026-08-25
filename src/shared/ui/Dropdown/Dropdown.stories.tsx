/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button, ButtonTheme } from '../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{padding: 300}}><Story /></div>
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

export const Default = Template.bind({});
Default.args = {
    items,
    trigger,
};
Default.decorators = [];

export const DefaultTopDirection = Template.bind({});
DefaultTopDirection.args = {
    items,
    trigger,
    direction: 'top left',
};
DefaultTopDirection.decorators = [];