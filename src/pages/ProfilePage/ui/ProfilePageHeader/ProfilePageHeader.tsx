import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { 
    getProfileData,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    updateProfileData 
} from "entities/Profile";
import { getUserAuthData } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { classNames } from "shared/lib/classNames/classNames";
import EditIcon from 'shared/assets/icons/edit-line-icon.svg';
import SaveIcon from 'shared/assets/icons/save-icon.svg';
import CancelIcon from 'shared/assets/icons/cancel-icon.svg';
import { HStack } from "shared/ui/Stack";


interface ProfilePageheaderProps {
    className?: string;
}

export const ProfilePageHeader = (props: ProfilePageheaderProps) =>{
    const {
        className,
    } = props;

    const { t } = useTranslation('profilePage');

    const readonly = useSelector(getProfileReadonly);
    const isLoading = useSelector(getProfileIsLoading);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch]);

    const onUpdateProfile = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className={ classNames('', {}, [className]) }>
                <Skeleton width={'50%'} height={40}/>
            </div>
        )
    }


    return(
        <HStack 
            className={ classNames('', {}, [className]) }
            justify={'between'}
            max
        >
            <Text
                title={`${t('ProfileCard.header')} ${profileData?.username}`}
            />

            {authData?.id == profileData?.id &&
                <>
                    {
                        readonly ?
                            (
                                <Button
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                >   
                                    <EditIcon />
                                    {t('ProfileCard.editBtn')}
                                </Button>
                            )
                            :
                            (
                                <HStack gap={'4'}>
                                    <Button
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onUpdateProfile}
                                        disabled={isLoading}
                                    >
                                        <SaveIcon />
                                        {t('ProfileCard.saveBtn')}
                                    </Button>
                                    <Button
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onCancelEdit}
                                        disabled={isLoading}
                                    >
                                        <CancelIcon />
                                        {t('ProfileCard.cancelBtn')}
                                    </Button>
                                </HStack>
                            )
                    }
                </>
            }
        </HStack>
    );
};
