import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';

import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';

import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { ValidateProfileDataError } from '../../model/types/EditableProfileCardSchema';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';


interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profilePage');
    const dispatch = useAppDispatch();

    const profileData = useSelector(getProfileForm);
    const profileIsLoading = useSelector(getProfileIsLoading);
    const profileError = useSelector(getProfileError);
    const profileReadonly = useSelector(getProfileReadonly);
    const profileValidateErrors = useSelector(getProfileValidateErrors);

    const validateErrorsMapping: Record<ValidateProfileDataError, string> = {
        [ValidateProfileDataError.INCORRECT_USERNAME]: t('errors.INCORRECT_USERNAME'),
        [ValidateProfileDataError.INCORRECT_USER_DATA]: t('errors.INCORRECT_USER_DATA'),
        [ValidateProfileDataError.INCORRECT_AGE]: t('errors.INCORRECT_AGE'),
        [ValidateProfileDataError.INCORRECT_REGIONAL_DATA]: t('errors.INCORRECT_REGIONAL_DATA'),
        [ValidateProfileDataError.NO_DATA]: t('errors.NO_DATA'),
        [ValidateProfileDataError.SERVER_ERROR]: t('errors.SERVER_ERROR'),
    }

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((firstname: string) => {
        dispatch(profileActions.updateFormData({firstname: firstname || ''}))
    }, [dispatch]);

    const onChangeLastname = useCallback((lastname: string) => {
        dispatch(profileActions.updateFormData({lastname: lastname || ''}))
    }, [dispatch]);

    const onChangeUsername = useCallback((username: string) => {
        dispatch(profileActions.updateFormData({username: username || ''}))
    }, [dispatch]);

    const onChangeAge = useCallback((age: string) => {
        dispatch(profileActions.updateFormData({age: Number(age || 0)}))
    }, [dispatch]);

    const onChangeAvatar = useCallback((url: string) => {
        dispatch(profileActions.updateFormData({avatar: url || ''}))
    }, [dispatch]);
    
    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateFormData({country: country || Country.Not_set}))
    }, [dispatch]);

    const onChangeCity = useCallback((city: string) => {
        dispatch(profileActions.updateFormData({city: city || ''}))
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateFormData({currency: currency || Currency.Not_set}))
    }, [dispatch]);

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount >
            <VStack max className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                <VStack max align='center'>
                    {
                        profileValidateErrors?.length &&
                        profileValidateErrors.map((error) => (
                            <Text
                                key={error}
                                text={validateErrorsMapping[error]}
                                theme={TextTheme.ERROR}
                            />
                        ))
                    }
                </VStack>
                <ProfileCard
                    formProfileData={profileData}
                    isLoading={profileIsLoading}
                    error={profileError}
                    readonly={profileReadonly}
                    onChangeUsername={onChangeUsername}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCountry={onChangeCountry}
                    onChangeCity={onChangeCity}
                    onChangeCurrency={onChangeCurrency}
                />
            </VStack>
        </DynamicReducerLoader>
    );
});
