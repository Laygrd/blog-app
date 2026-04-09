import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "features/AuthByUsername";
import { getUserAuthData, userActions } from "entities/User";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";


interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onOpenAuthModal = useCallback(() => setIsAuthModal(true), []);
    const onCloseAuthModal = useCallback(() => setIsAuthModal(false), []);
    const onLogout = useCallback(() => {
        dispatch(userActions.clearAuthData())
        navigate('/'); // go to main page after logout
    }, [dispatch, navigate]);


    if (authData) {
        return (
            <header className={ classNames(cls.Navbar, {}, [className]) }>
                <div className={cls.links}>
                    <Button
                        className={cls.loginBtn}
                        theme={ButtonTheme.CLEAR_INVERTED}
                        onClick={onLogout}
                    >
                        {t('Navbar.logout')}
                    </Button>
                </div>
            </header>
        );
    };

    return (
        <header className={ classNames(cls.Navbar, {}, [className]) }>
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
