import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Input } from "@/shared/ui/Input/Input";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { DynamicReducerLoader, ReducersList } from "@/shared/lib/components/DynamicReducerLoader/DynamicReducerLoader";

import { loginByUsername } from "../../model/services/loginByUsername";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { getLoginFormError } from "../../model/selectors/getLoginFormError/getLoginFormError";
import { getLoginFormUsername } from "../../model/selectors/getLoginFormUsername/getLoginFormUsername";
import { getLoginFormPassword } from "../../model/selectors/getLoginFormPassword/getLoginFormPassword";
import { getLoginFormIsLoading } from "../../model/selectors/getLoginFormIsLoading/getLoginFormIsLoading";
import cls from "./LoginForm.module.scss";


const initialReducers: ReducersList = {
    loginForm: loginReducer
};

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) =>{
    const { t } = useTranslation();
    const username = useSelector(getLoginFormUsername);
    const password = useSelector(getLoginFormPassword);
    const isLoading = useSelector(getLoginFormIsLoading);
    const error = useSelector(getLoginFormError);
    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({username, password}))
        if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
            onSuccess();
        }
    }, [onSuccess, dispatch, username, password]);

    return(
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicReducerLoader 
            reducers={initialReducers}
            removeAfterUnmount
        >
            <div 
                className={ classNames(cls.LoginForm, {}, [className]) }
                data-testid="login-form"
            >
                <Text className={cls.header} title={t('LoginForm.header')} />
                {
                    error && 
                    <Text 
                        className={cls.errorBlock}

                        text={t(error)}
                        theme={TextTheme.ERROR}
                    />
                }
                <Input
                    id="username"
                    className={cls.input}
                    type="text"
                    placeholder={t('LoginForm.plhrUsername')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    id="password"
                    className={cls.input}
                    type="text"
                    placeholder={t('LoginForm.plhrPassword')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={cls.loginBtn}
                    type="button"
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('LoginForm.submitBtn')}
                </Button>
            </div>
        </DynamicReducerLoader>
    );
});

export default LoginForm; // for lazy