import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { LoginModal } from "features/AuthByUsername";
import { NotificationButton } from "features/notificationButton";
import { AvatarDropdown } from "features/avatarDropdown";

import { getUserAuthData } from "entities/User";

import { HStack } from "shared/ui/Stack";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { RouterPaths } from "shared/config/router/routerVars";
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import cls from "./Navbar.module.scss";


interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onOpenAuthModal = useCallback(() => setIsAuthModal(true), []);
    const onCloseAuthModal = useCallback(() => setIsAuthModal(false), []);

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
                    gap='16'
                >
                    <NotificationButton />
                    <AvatarDropdown />
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
