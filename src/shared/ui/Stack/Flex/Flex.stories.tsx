/* eslint-disable i18next/no-literal-string */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex { ...args } />;

const children = (
    <>
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
        <div>item4</div>
        <div>item5</div>
    </>
);

export const RowGap4 = Template.bind({});
RowGap4.args = {
    gap: '4',
    children
};
RowGap4.decorators = [];

export const RowGap8 = Template.bind({});
RowGap8.args = {
    gap: '8',
    children
};
RowGap8.decorators = [];

export const RowGap16 = Template.bind({});
RowGap16.args = {
    gap: '16',
    children
};
RowGap16.decorators = [];

export const RowGap32 = Template.bind({});
RowGap32.args = {
    gap: '32',
    children
};
RowGap32.decorators = [];


export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
    direction: 'column',
    gap: '4',
    children
};
ColumnGap4.decorators = [];

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
    direction: 'column',
    gap: '8',
    children
};
ColumnGap8.decorators = [];

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
    direction: 'column',
    gap: '16',
    children
};
ColumnGap16.decorators = [];

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
    direction: 'column',
    gap: '32',
    children
};
ColumnGap32.decorators = [];