import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
//import { Select, SelectOption, SelectTheme } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";
import { classNames } from "shared/lib/classNames/classNames";
import { ListBox, ListBoxItem, ListBoxTheme } from "shared/ui/ListBox/ListBox";

interface CurrencySelectProps {
    id?: string;
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readOnly?: boolean;
    theme?: ListBoxTheme;
}

const options: ListBoxItem[] = [
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.USD, content: Currency.USD},
    {value: Currency.Not_set, content: Currency.Not_set},
];

export const CurrencySelect = memo((props: CurrencySelectProps) =>{
    const { t } = useTranslation();

    const {
        className,
        value,
        onChange,
        readOnly = false,
        theme = ListBoxTheme.PRIMARY,
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange])

    return(
        // <Select
        //     id={id}
        //     className={ classNames('', {}, [className]) }
        //     label={t('CurrencySelect.label')}
        //     options={options}
        //     value={value}
        //     readOnly={readOnly}
        //     onChange={onChangeHandler}
        //     theme={theme}
        // />
        <ListBox
            className={ classNames('', {}, [className]) }
            label={t('CurrencySelect.label')}
            items={options}
            value={value}
            readOnly={readOnly}
            onChange={onChangeHandler}
            theme={theme}
        />
    );
});


