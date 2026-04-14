import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { 
    getProfileError, 
    getProfileIsLoading, 
    getProfileReadonly, 
    getProfileValidateErrors,
    ProfileCard, 
    profileReducer,
    fetchProfileData,
    profileActions,
    ValidateProfileDataError,
} from "entities/Profile";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileForm } from "entities/Profile";
import { Page } from "widgets/Page";
import { DynamicReducerLoader, ReducersList } from "shared/lib/components/DynamicReducerLoader/DynamicReducerLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import cls from './ProfilePage.module.scss';


const reducers: ReducersList = {
    profile: profileReducer
};

const ProfilePage = () => {
    const { t } = useTranslation('profilePage');
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();

    const profileData = useSelector(getProfileForm);
    const profileIsLoading = useSelector(getProfileIsLoading);
    const profileError = useSelector(getProfileError);
    const profileReadonly = useSelector(getProfileReadonly);
    const profileValidateErrors = useSelector(getProfileValidateErrors);

    const validateErrorsMapping = {
        [ValidateProfileDataError.INCORRECT_USERNAME]: t('INCORRECT_USERNAME'),
        [ValidateProfileDataError.INCORRECT_USER_DATA]: t('INCORRECT_USER_DATA'),
        [ValidateProfileDataError.INCORRECT_AGE]: t('INCORRECT_AGE'),
        [ValidateProfileDataError.INCORRECT_REGIONAL_DATA]: t('INCORRECT_REGIONAL_DATA'),
        [ValidateProfileDataError.NO_DATA]: t('NO_DATA'),
        [ValidateProfileDataError.SERVER_ERROR]: t('SERVER_ERROR'),
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
        <DynamicReducerLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={cls.ProfilePage}>
                <ProfilePageHeader />

                <div className={cls.errors}>
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
                </div>

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
            </Page>
        </DynamicReducerLoader>
    )

};

export default memo(ProfilePage);