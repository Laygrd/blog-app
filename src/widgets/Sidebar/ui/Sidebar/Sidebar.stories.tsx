import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const PrimaryAuth = Template.bind({});
PrimaryAuth.args = {};
PrimaryAuth.decorators = [
    StoreDecorator({
        user: {
            authData: {}
        }
    })
];

export const PrimaryNotAuth = Template.bind({});
PrimaryNotAuth.args = {};
PrimaryNotAuth.decorators = [
    StoreDecorator({
        user: {}
    })
];

export const PrimaryAuthDark = Template.bind({});
PrimaryAuthDark.args = {};
PrimaryAuthDark.decorators = [
    StoreDecorator({
        user: {
            authData: {}
        }
    }),
    ThemeDecorator(Theme.DARK)
];

export const PrimaryNotAuthDark = Template.bind({});
PrimaryNotAuthDark.args = {};
PrimaryNotAuthDark.decorators = [
    StoreDecorator({
        user: {}
    }),
    ThemeDecorator(Theme.DARK)
];