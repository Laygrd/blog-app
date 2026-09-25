import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserAuthData } from 'entities/User';

import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import SaveIcon from 'shared/assets/icons/save-icon.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import EditIcon from 'shared/assets/icons/edit-line-icon.svg';
import CancelIcon from 'shared/assets/icons/cancel-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { profileActions } from '../../model/slice/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';


interface EditableProfileCardHeaderProps {
   className?: string;
}

export const EditableProfileCardHeader = (props: EditableProfileCardHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profilePage');

    const readonly = useSelector(getProfileReadonly);
    const isLoading = useSelector(getProfileIsLoading);
    const profileData = useSelector(getProfileData);
    const authData = useSelector(getUserAuthData);

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

    return (
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
                                    data-testid='EditableProfileCardHeader.EditBtn'
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
                                        data-testid={'EditableProfileCardHeader.SaveBtn'}
                                    >
                                        <SaveIcon />
                                        {t('ProfileCard.saveBtn')}
                                    </Button>
                                    <Button
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onCancelEdit}
                                        disabled={isLoading}
                                        data-testid={'EditableProfileCardHeader.CancelBtn'}
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
}
