import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";


interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
};

export function useTheme(): UseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    const applyTheme = (theme: Theme) => {
        document.body.className = theme;
    };

    applyTheme(theme || Theme.LIGHT);

    const toggleTheme = () => {
        //const newTheme = theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT; // old way

        let newTheme = Theme.LIGHT; // new way

        switch (theme) {
        case Theme.LIGHT:
            newTheme = Theme.DARK;
            break;
        case Theme.DARK:
            newTheme = Theme.GREEN;
            break;
        case Theme.GREEN:
            newTheme = Theme.LIGHT;
            break;
        default:
            newTheme = Theme.LIGHT
            break;
        }

        applyTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
        setTheme?.(newTheme);
    };
    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
};
