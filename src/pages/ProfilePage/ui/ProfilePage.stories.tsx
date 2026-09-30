import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ValidateProfileDataError } from 'features/editableProfileCard';

import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import avatar from 'shared/assets/tests/avatar_default.jpg';

import ProfilePage from './ProfilePage';


const profileData: Profile = {
    id: '1',
    username: 'username1',
    firstname: 'firstname1',
    lastname: 'lastname1',
    age: '18',
    city: 'default_city',
    country: Country.Not_set,
    currency: Currency.Not_set,
    avatar,
}

export default {
    title: 'pages/ProfilePage/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

//@ts-ignore
const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        profile: {
            form: profileData,
            data: profileData,
            readonly: true,
        }
    })
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    StoreDecorator({
        profile: {
            form: profileData,
            data: profileData,
            readonly: true,
        }
    }), 
    ThemeDecorator(Theme.DARK)
];

export const CanEdit = Template.bind({});
CanEdit.args = {};
CanEdit.decorators = [
    StoreDecorator({
        profile: {
            form: profileData,
            data: profileData,
            readonly: true,
        },
        user: { authData: {id: '1'}}
    })
];

export const CanEditDark = Template.bind({});
CanEditDark.args = {};
CanEditDark.decorators = [
    StoreDecorator({
        profile: {
            form: profileData,
            data: profileData,
            readonly: true,
        },
        user: { authData: {id: '1'}}
    }), 
    ThemeDecorator(Theme.DARK)
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        profile: {
            form: {...profileData, username: ''},
            data: {...profileData, username: ''},
            readonly: false,
            validateErrors: [ValidateProfileDataError.INCORRECT_USER_DATA, ]
        }
    })
];

export const ErrorDark= Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    StoreDecorator({
        profile: {
            form: {...profileData, username: ''},
            data: {...profileData, username: ''},
            readonly: false,
            validateErrors: [ValidateProfileDataError.INCORRECT_USER_DATA, ]
        }
    }), 
    ThemeDecorator(Theme.DARK)
];