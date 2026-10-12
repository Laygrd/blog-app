import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserAuthData, getUserIsAdmin, getUserIsManager, userActions } from 'entities/User';

import { Dropdown } from 'shared/ui/Popups';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarTheme } from 'shared/ui/Avatar/Avatar';
import { RouterPaths } from 'shared/config/router/routerVars';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';


interface AvatarDropdownProps {
   className?: string;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(getUserIsAdmin);
    const isManager = useSelector(getUserIsManager);
    const isAdminPanelAvailable = isAdmin || isManager;
    const onLogout = useCallback(() => {
        dispatch(userActions.clearAuthData())
        // navigate('/'); // go to main page after logout
    }, [dispatch]);

    if (!authData) {
        return null;
    };

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction={'bottom left'}
            trigger={
                <Avatar
                    size={30}
                    src={authData.avatarUrl}
                    theme={AvatarTheme.ROUNDED}
                />
            }
            items={[
                ...( isAdminPanelAvailable ? [
                    {
                        content: t('AvatarDropdown.admin'),
                        href: RouterPaths.admin_panel
                    }
                ] : []),
                {
                    content: t('AvatarDropdown.profile'),
                    href: RouterPaths.profiles + authData.id
                },
                {
                    content: t('AvatarDropdown.logout'),
                    onClick: onLogout,
                }
            ]}
        />
    );
};
