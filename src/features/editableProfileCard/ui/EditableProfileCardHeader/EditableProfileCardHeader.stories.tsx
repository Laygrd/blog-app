import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileSchema } from '../../model/types/EditableProfileCardSchema';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'features/EditableProfileCard/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => <EditableProfileCardHeader { ...args } />;

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

export const CanEdit = Template.bind({});
CanEdit.args = {

};
CanEdit.decorators = [
    StoreDecorator({
        profile: profile,
        user: {authData: {id: '1'}}
    })
]

export const CanEditDark = Template.bind({});
CanEditDark.args = {

};
CanEditDark.decorators = [
    StoreDecorator({
        profile: profile,
        user: {authData: {id: '1'}}
    }),
    ThemeDecorator(Theme.DARK)
]

export const CantEdit = Template.bind({});
CantEdit.args = {

};
CantEdit.decorators = [
    StoreDecorator({
        profile: profile,
        user: {authData: {id: '2'}}
    })
]

export const CantEditDark = Template.bind({});
CantEditDark.args = {

};
CantEditDark.decorators = [
    StoreDecorator({
        profile: profile,
        user: {authData: {id: '2'}}
    }),
    ThemeDecorator(Theme.DARK)
]
