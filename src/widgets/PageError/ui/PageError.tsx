import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./PageError.module.scss";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";


export const PageError = () => {
    const { t } = useTranslation();

    const doReload = () => {
        window.location.reload();
    };

    return (
        <div className={ classNames(cls.PageError) }>
            {t('PageError.message')}
            <Button
                theme={ButtonTheme.CLEAR}
                onClick={doReload}
            >
                {t('PageError.reloadBtnText')}
            </Button>
        </div>
    );
};
