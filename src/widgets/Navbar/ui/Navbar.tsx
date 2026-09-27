import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { LoginModal } from "features/AuthByUsername";

import { getUserAuthData, getUserIsAdmin, getUserIsManager, userActions } from "entities/User";

import { HStack } from "shared/ui/Stack";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { RouterPaths } from "shared/config/router/routerVars";
import { Avatar, AvatarTheme } from "shared/ui/Avatar/Avatar";
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";

import cls from "./Navbar.module.scss";


interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

    const isAdmin = useSelector(getUserIsAdmin);
    const isManager = useSelector(getUserIsManager);
    const isAdminPanelAvailable = isAdmin || isManager;

    const onOpenAuthModal = useCallback(() => setIsAuthModal(true), []);
    const onCloseAuthModal = useCallback(() => setIsAuthModal(false), []);
    const onLogout = useCallback(() => {
        dispatch(userActions.clearAuthData())
        // navigate('/'); // go to main page after logout
    }, [dispatch]);


    if (authData) {
        return (
            <header className={ classNames(cls.Navbar, {}, [className]) }>
                <Text
                    className={cls.appName}
                    size={TextSize.M}
                    title={t('Navbar.appName')}
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    className={cls.createNewLink}
                    to={RouterPaths.articles_create}
                    theme={AppLinkTheme.INVERTED}
                >
                    {t('Navbar.createNewArticleLink')}
                </AppLink>
                <HStack
                    className={cls.links}
                    align={'center'}
                    justify={'center'}
                >
                    <Dropdown
                        direction={'bottom right'}
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
                                    content: t('Navbar.admin'),
                                    href: RouterPaths.admin_panel
                                }
                            ] : []),
                            {
                                content: t('Navbar.profile'),
                                href: RouterPaths.profiles + authData.id
                            },
                            {
                                content: t('Navbar.logout'),
                                onClick: onLogout,
                            }
                        ]}
                    />
                </HStack>
            </header>
        );
    };

    return (
        <header className={ classNames(cls.Navbar, {}, [className]) }>
            <Text
                className={cls.appName}
                size={TextSize.M}
                title={t('Navbar.appName')}
                theme={TextTheme.INVERTED}
            />
            <div className={cls.links}>
                <Button
                    className={cls.loginBtn}
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onOpenAuthModal}
                >
                    {t('Navbar.login')}
                </Button>
                {   
                    // тут можно как бы просто указать lazy модалке, но тогда не демонтируется loginFormReducer
                    // ToDo: подумать как это еще можно сделать..
                    isAuthModal &&
                    <LoginModal
                        isOpen={isAuthModal}
                        onClose={onCloseAuthModal}
                    />
                }

            </div>
        </header>
    );
};
