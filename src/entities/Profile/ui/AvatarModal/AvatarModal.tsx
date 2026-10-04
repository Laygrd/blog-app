import { Suspense } from "react";
import { Modal, ModalProps } from "shared/ui/Modal/Modal";
import { Loader } from "shared/ui/Loader/Loader";
import { classNames } from "shared/lib/classNames/classNames";
import { AvatarFormAsync } from "../AvatarForm/AvatarForm.async";
import cls from "./AvatarModal.module.scss";


interface AvatarModalProps extends ModalProps {
    onChangeAvatar?: (src: string) => void;
    src: string;
}

export const AvatarModal = (props: AvatarModalProps) =>{
    const {
        className,
        isOpen,
        onClose,
        onChangeAvatar,
        src,
        ...otherProps
    } = props;

    return(
        <Modal
            className={classNames(cls.AvatarModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            {...otherProps}
        >
            <Suspense fallback={<Loader />}>
                <AvatarFormAsync 
                    src={src}
                    onChangeAvatar={onChangeAvatar}
                />
            </Suspense>
        </Modal>
    );

};
