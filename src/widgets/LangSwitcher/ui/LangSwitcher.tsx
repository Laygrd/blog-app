import { memo } from "react";
import { useTranslation } from "react-i18next";
import LngIcon from '@/shared/assets/icons/language-icon.svg';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Icon, IconTheme } from "@/shared/ui/Icon/Icon";
import cls from "./LangSwitcher.module.scss";


interface LangSwitcherProps {
    className?: string;
    shortLngDisplay?: boolean;
}

export const LangSwitcher = memo(({ className, shortLngDisplay = true }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const changeLang = async () => {
        i18n.changeLanguage(
            i18n.language === 'ru'
                ? 'en'
                : 'ru'
        );
    };
    return (
        <Button
            onClick={changeLang}
            className={ classNames(cls.LangSwitcher, {}, [className]) }
            theme={ButtonTheme.ICON}
        >
            <Icon theme={IconTheme.INVERTED_PIRMARY} Svg={LngIcon}/>
            <span>
                {
                    shortLngDisplay 
                        ? t('LangSwitcher.language_short')
                        : t('LangSwitcher.language_full')
                }
            </span>
        </Button>
    );
});
