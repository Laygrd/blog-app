import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Country, CountrySelect } from "entities/Country";
import { Currency, CurrencySelect } from "entities/Currency";

import { Text } from "shared/ui/Text/Text";
import { Input, InputTheme } from "shared/ui/Input/Input";
import { Avatar, AvatarTheme } from "shared/ui/Avatar/Avatar";
import { classNames } from "shared/lib/classNames/classNames";
import { SelectTheme } from "shared/ui/Select/Select";
import { HStack, VStack } from "shared/ui/Stack";

import { Profile } from "../../model/types/ProfileSchema";
import { AvatarModal } from "../AvatarModal/AvatarModal";
import { ProfileCardSkeleton } from "./ProfileCardSkeleton";
import cls from "./ProfileCard.module.scss";


interface ProfileCardProps {
    className?: string;
    formProfileData?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;

    onChangeFirstname?: (firstname: string) => void;
    onChangeLastname?: (lastname: string) => void;
    onChangeAge?: (age: string) => void;
    onChangeUsername?: (username: string) => void;
    onChangeCountry?: (country: Country) => void;
    onChangeCity?: (city: string) => void;
    onChangeCurrency?: (curency: Currency) => void;
    onChangeAvatar?: (url: string) => void;
}

export const ProfileCard = (props: ProfileCardProps) =>{
    const {
        className,
        formProfileData,
        error,
        isLoading = false,
        readonly = true,
        onChangeUsername,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeAvatar,
        onChangeCity,
        onChangeCountry,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation('profilePage');

    const [isAvatarModal, setIsAvatarModal] = useState(false);
    const onAvatarModal = () => {
        setIsAvatarModal(true)
    };
    const onCloseAvatarModal = () => {
        setIsAvatarModal(false)
    };

    let content;

    if (isLoading) {
        content = ( <ProfileCardSkeleton />)
    } else if (error) {
        content = (<Text title={t('errors.SERVER_ERROR')}/>)
    } else {
        content = (
            <>
                <Avatar
                    src={formProfileData?.avatar}
                    theme={AvatarTheme.ROUNDED}
                    size={200}
                    editable={!readonly}
                    onEdit={onAvatarModal}
                />

                <HStack align={'start'} gap={'32'}>
                    <VStack gap={'16'}>
                        <Text text={t('ProfileCard.mainInfo')}/>
                        <Input
                            id="profileCard.userName"
                            placeholder={t('ProfileCard.userName')}
                            value={ formProfileData?.username }
                            readOnly={readonly}
                            onChange={onChangeUsername}
                            theme={InputTheme.UNDERLINE}
                        />
                        <Input
                            id="profileCard.firstName"
                            placeholder={t('ProfileCard.firstName')}
                            value={ formProfileData?.firstname }
                            readOnly={readonly}
                            onChange={onChangeFirstname}
                            theme={InputTheme.UNDERLINE}
                        />
                        <Input
                            id="profileCard.lastName"
                            placeholder={t('ProfileCard.lastName')}
                            value={ formProfileData?.lastname }
                            readOnly={readonly}
                            onChange={onChangeLastname}
                            theme={InputTheme.UNDERLINE}
                        />
                        <Input
                            id="profileCard.age"
                            placeholder={t('ProfileCard.age')}
                            value={ formProfileData?.age }
                            readOnly={readonly}
                            onChange={onChangeAge}
                            theme={InputTheme.UNDERLINE}
                        />
                    </VStack>
                    <VStack gap={'16'}>
                        <Text text={t('ProfileCard.regionalInfo')}/>
                        <CountrySelect
                            id="profileCard.country"
                            value={ formProfileData?.country }
                            readOnly={readonly}
                            onChange={onChangeCountry}
                            theme={SelectTheme.UNDERLINE}
                            
                        />
                        <Input
                            id="profileCard.city"
                            placeholder={t('ProfileCard.city')}
                            value={ formProfileData?.city }
                            readOnly={readonly}
                            onChange={onChangeCity}
                            theme={InputTheme.UNDERLINE}
                        />
                        <CurrencySelect
                            id="profileCard.currency"
                            value={ formProfileData?.currency }
                            readOnly={readonly}
                            onChange={onChangeCurrency}
                            theme={SelectTheme.UNDERLINE}
                        />
                    </VStack>
                </HStack>
                {
                    isAvatarModal && 
                    <AvatarModal 
                        isOpen={isAvatarModal}
                        onClose={onCloseAvatarModal}
                        src={formProfileData?.avatar || ''}
                        onChangeAvatar={onChangeAvatar}
                    />
                }
            </>
        )
    };

    return(
        <VStack 
            className={ classNames(cls.ProfileCard, {}, [className]) }
            align={'center'}
            gap={'32'}
            max
        >
            {content}
        </VStack>
    );
};
