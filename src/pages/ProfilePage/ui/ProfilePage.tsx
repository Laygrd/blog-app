import { memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "widgets/Page";
import { EditableProfileCard } from "features/editableProfileCard";
import { VStack } from "shared/ui/Stack";

import { Text, TextTheme } from "shared/ui/Text/Text";


const ProfilePage = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation('profilePage');

    if (!id) {
        return (
            <Page>
                <VStack max align='center' justify='center'>
                    <Text text={ t('errors.ID_MISSING') } theme={TextTheme.ERROR}/>
                </VStack>
            </Page>
        )
    }

    return (
        <Page>
            <VStack max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    )
};

export default memo(ProfilePage);