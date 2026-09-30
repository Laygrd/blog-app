import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ProfileSchema } from '../../model/types/EditableProfileCardSchema';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'features/EditableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

const profile: ProfileSchema = {
    readonly: false,
    isLoading: false,
    error: undefined,
    data: {
        id: '1',
        username: 'admin',
        firstname: 'admin',
        lastname: 'admin',
        age: 24,
        city: 'somecity',
        country: Country.Not_set,
        currency: Currency.Not_set
    },
    form: {
        id: '1',
        username: 'admin',
        firstname: 'admin',
        lastname: 'admin',
        age: 24,
        city: 'somecity',
        country: Country.Not_set,
        currency: Currency.Not_set
    }
}

export const Primary = Template.bind({});
Primary.args = {

};
Primary.decorators = [StoreDecorator({
    profile: profile,
    user: {authData: {id: '1'}}
})]

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {

};
PrimaryDark.decorators = [
    StoreDecorator({
        profile: profile,
        user: {authData: {id: '1'}}
    }),
    ThemeDecorator(Theme.DARK)
]

export const IsLoading = Template.bind({});
IsLoading.args = {

};
IsLoading.decorators = [StoreDecorator({
    profile: {...profile, isLoading: true},
    user: {authData: {id: '1'}}
})]

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = {

};
IsLoadingDark.decorators = [
    StoreDecorator({
        profile: {...profile, isLoading: true},
        user: {authData: {id: '1'}}
    }),
    ThemeDecorator(Theme.DARK)
]
