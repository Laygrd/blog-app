import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TabItem, Tabs } from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs { ...args } />;

const tabs: TabItem[] = [
    {
        value: '1',
        content: 'type 1'
    },
    {
        value: '2',
        content: 'type 2'
    },
    {
        value: '3',
        content: 'type 3'
    }
]

export const Default = Template.bind({});
Default.args = {
    tabs: tabs,
    value: '1'
};
Default.decorators = [];
