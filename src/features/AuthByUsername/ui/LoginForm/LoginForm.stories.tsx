import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import LoginForm from './LoginForm';


export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({ 
    loginForm: {
        username: 'user1',
        password: 'password',
    }
})]

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({ 
    loginForm: {
        username: 'user1',
        password: 'password',
        error: 'ERROR'
    }
})]

export const Pending = Template.bind({});
Pending.args = {};
Pending.decorators = [StoreDecorator({ 
    loginForm: {
        username: 'user1',
        password: 'password',
        isLoading: true,
    }
})]

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ 
        loginForm: {
            username: 'user1',
            password: 'password'
        }
    }),
];

export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ 
        loginForm: {
            username: 'user1',
            password: 'password',
            error: 'ERROR'
        }
    })
]

export const PendingDark = Template.bind({});
PendingDark.args = {};
PendingDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ 
        loginForm: {
            username: 'user1',
            password: 'password',
            isLoading: true,
        }
    })
];
