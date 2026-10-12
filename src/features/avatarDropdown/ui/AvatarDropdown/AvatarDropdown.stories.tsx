import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { UserRole } from 'entities/User';
import Avatar from 'shared/assets/tests/avatar_default.jpg';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'features/AvatarDropdown/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 100}}><Story /></div>
    ]
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown { ...args } />;

export const PrimaryAdminRole = Template.bind({});
PrimaryAdminRole.args = {};
PrimaryAdminRole.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '1',
            username: 'admin',
            roles: [UserRole.ADMIN],
            avatarUrl: Avatar
        }
    }
})];


export const PrimaryUserRole = Template.bind({});
PrimaryUserRole.args = {};
PrimaryUserRole.decorators = [StoreDecorator({
    user: {
        authData: {
            id: '1',
            username: 'admin',
            roles: [UserRole.USER],
            avatarUrl: Avatar
        }
    }
})];

export const DarkAdminRole = Template.bind({});
DarkAdminRole.args = {};
DarkAdminRole.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'admin',
                roles: [UserRole.ADMIN],
                avatarUrl: Avatar
            }
        }
    }),
    ThemeDecorator(Theme.DARK)
];


export const DarkUserRole = Template.bind({});
DarkUserRole.args = {};
DarkUserRole.decorators = [
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                username: 'admin',
                roles: [UserRole.USER],
                avatarUrl: Avatar
            }
        }
    }),
    ThemeDecorator(Theme.DARK)
];