import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import avatar from 'shared/assets/tests/avatar_default.jpg';
import { Profile } from '../../model/types/ProfileSchema';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';


const profileData: Profile = {
    username: 'username1',
    firstname: 'firstname1',
    lastname: 'lastname1',
    age: '18',
    city: 'default_city',
    country: Country.Not_set,
    currency: Currency.Not_set,
    avatar
}

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;


const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    formProfileData: profileData,
};
Primary.decorators = [];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    formProfileData: profileData,
};
PrimaryDark.decorators = [
    ThemeDecorator(Theme.DARK)
];

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};
IsLoading.decorators = [];

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = {
    isLoading: true,
};
IsLoadingDark.decorators = [
    ThemeDecorator(Theme.DARK)
];

export const Error = Template.bind({});
Error.args = {
    error: 'err',
};
Error.decorators = [];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    error: 'err',
};
ErrorDark.decorators = [
    ThemeDecorator(Theme.DARK)
];