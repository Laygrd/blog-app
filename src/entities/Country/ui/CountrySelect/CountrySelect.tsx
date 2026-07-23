import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Select, SelectOption, SelectTheme } from "shared/ui/Select/Select";
import { Country } from "../../model/types/country";
import { classNames } from "shared/lib/classNames/classNames";

interface CountrySelectProps {
    id?: string;
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readOnly?: boolean;
    theme?: SelectTheme;
}

const options: SelectOption<Country>[] = [
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Georgia, content: Country.Georgia},
    {value: Country.Kazakstan, content: Country.Kazakstan},
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Ukraine, content: Country.Ukraine},
    {value: Country.Not_set, content: Country.Not_set}
];

export const CountrySelect = memo((props: CountrySelectProps) =>{
    const { t } = useTranslation();

    const {
        id,
        className,
        value,
        onChange,
        readOnly = false,
        theme = SelectTheme.PRIMARY,
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [onChange])

    return(
        <Select
            id={id}
            className={ classNames('', {}, [className]) }
            label={t('CountrySelect.label')}
            options={options}
            value={value}
            readOnly={readOnly}
            onChange={onChangeHandler}
            theme={theme}
        />
    );
});


