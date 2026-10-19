import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card { ...args } />;

export const Default = Template.bind({});
Default.args = {
    children: 'some card text'
};
Default.decorators = [];

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    children: 'some card text'
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];
