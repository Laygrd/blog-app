import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { EditableProfileCard } from "./EditableProfileCard";import userEvent from '@testing-library/user-event';
import { Profile } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileReducer } from '../../model/slice/profileSlice';
import { StateSchema } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { $api } from 'shared/api/api';


const profile: Profile = {
    id: '1',
    username: 'admin123',
    firstname: 'admin',
    lastname: 'admin',
    age: 20,
    city: 'somecity',
    country: Country.Not_set,
    currency: Currency.Not_set,
};

const options: { initialState: DeepPartial<StateSchema>, asyncReducers: DeepPartial<ReducersMapObject<StateSchema>>} = {
    initialState: {
        profile: {
            isLoading: false,
            readonly: true,
            data: profile,
            form: profile,
            error: undefined,
            validateErrors: [],
        },
        user: {
            authData: {
                id: '1',
                username: 'admin'
            }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}

describe('features/EditableProfileCard', () => {
    test('default render', () => {
        componentRender(<EditableProfileCard id={'1'}/>, options )
        expect(screen.getByTestId('EditableProfileCard')).toBeInTheDocument();
    });

    test('readonly mode should toggle to edit mode', async () => {
        componentRender(<EditableProfileCard id={'1'}/>, options )
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
        
        expect(screen.getByTestId('EditableProfileCardHeader.CancelBtn')).toBeInTheDocument()
    });

    test('cancel btn should reset form data equal to data', async () => {
        componentRender(<EditableProfileCard id={'1'}/>, options )
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
        
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelBtn'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
    });

    test('validation shoud reject incorrect firstname data', async () => {
        componentRender(<EditableProfileCard id={'1'}/>, options )
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
        
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveBtn'));

        expect(
            screen.getByTestId('EditableProfileCard.ErrorMessageBlock.Paragraph')
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('EditableProfileCard.ErrorMessageBlock.Paragraph')
        ).toHaveTextContent('errors.INCORRECT_USER_DATA');
    });

    test('save btn with correct data should pass through validation and call $api PUT method', async () => {
        const mockedPutRequest = jest.spyOn($api, 'put');

        componentRender(<EditableProfileCard id={'1'}/>, options )

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditBtn'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveBtn'));

        expect(mockedPutRequest).toHaveBeenCalled();
        
    });
})