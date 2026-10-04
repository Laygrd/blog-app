import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Text } from "shared/ui/Text/Text";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Input } from "shared/ui/Input/Input";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";

import cls from "./AvatarForm.module.scss";


export interface AvatarFormProps {
    className?: string;
    src?: string;
    onChangeAvatar?: (src: string) => void;
}

const AvatarForm = (props: AvatarFormProps) =>{
    const {
        className,
        src = '',
        onChangeAvatar,
    } = props;

    const { t } = useTranslation('profilePage');

    const [inputSrc, setInputSrc] = useState(src);
    const onSaveAvatar = () => {
        onChangeAvatar?.(inputSrc);
    };

    return(
        <div className={ classNames(cls.AvatarForm, {}, [className]) }>
            <Text
                title={t('ProfileCard.AvatarModal.title')}
            />
            <Avatar
                className={cls.image}
                size={430}
                src={inputSrc}
            />
            <div
                className={cls.inputBlock}
            >
                <Input
                    className={cls.input}
                    id={"avatar-edit"} 
                    placeholder={t('ProfileCard.AvatarModal.formPh')}
                    value={inputSrc}
                    onChange={setInputSrc}
                />
                <Button 
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSaveAvatar}
                >
                    {t('ProfileCard.AvatarModal.saveBtn')}
                </Button>
            </div>
        </div>
    );
};

export default AvatarForm;
