import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from 'widgets/Page';


const MainPage = () => {
    const { t } = useTranslation('mainPage');
    return (
        <Page>
            {t('title')}
        </Page>
    )
};

export default memo(MainPage);