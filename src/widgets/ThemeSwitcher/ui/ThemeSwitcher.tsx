import { memo } from 'react';
import { useTheme, Theme } from "@/app/providers/ThemeProvider";

import { Icon, IconTheme } from '@/shared/ui/Icon/Icon';
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import { classNames } from "@/shared/lib/classNames/classNames";
import ThemeDarkIcon from '@/shared/assets/icons/theme-dark-icon.svg';
import ThemeLightIcon from '@/shared/assets/icons/theme-light-icon.svg';


interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme(); // все что касается тем, локализации в fsd 2.0 еще плохо
    return (
        <Button
            className={ classNames('', {}, [className]) }
            theme={ButtonTheme.ICON}
            onClick={toggleTheme}
        >
            <Icon
                theme={IconTheme.INVERTED_PIRMARY}
                Svg={ theme == Theme.LIGHT ? ThemeLightIcon : ThemeDarkIcon }
            />
        </Button>
    );
});
ThemeSwitcher.displayName = 'ThemeSwitcher';
