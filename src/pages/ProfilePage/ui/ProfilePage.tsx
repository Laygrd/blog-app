import { memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { ProfileRating } from "@/features/profileRating";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text/Text";
import cls from './ProfilePage.module.scss';


const ProfilePage = () => {
    const { id } = useParams<{id: string}>();
    const { t } = useTranslation('profilePage');

    if (__PROJECT__ === 'storybook') {
        return (
            <Page>
                <VStack max>
                    <EditableProfileCard id={"1"} />
                    <ProfileRating profileId={"1"}/>
                </VStack>
            </Page>
        )
    }

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
            <VStack max align={'center'} gap={'32'}>
                <EditableProfileCard id={id} />
                <ProfileRating className={cls.ProfileRating} profileId={id} />
            </VStack>
        </Page>
    )
};

export default memo(ProfilePage);
