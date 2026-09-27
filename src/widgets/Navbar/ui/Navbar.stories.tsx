import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from './Navbar';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';


export default {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    //RouterDecorator,
    StoreDecorator({
        user: { authData: undefined}
    })
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    //RouterDecorator,
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: undefined}
    })
];

export const Authenticated = Template.bind({});
Authenticated.args = {};
Authenticated.decorators = [
    //RouterDecorator,
    StoreDecorator({
        user: { authData: {id: '1', username: 'user1'}}
    })
];

export const AuthenticatedDark = Template.bind({});
AuthenticatedDark.args = {};
AuthenticatedDark.decorators = [
    //RouterDecorator,
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: { authData: {id: '1', username: 'user1'}}
    })
];