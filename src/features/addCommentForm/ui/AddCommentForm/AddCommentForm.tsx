import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { HStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    addCommentFormReducer,
    addCommentFormActions,
} from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormText } from '../../model/selectors/getAddCommentFormText/getAddCommentFormText';
import cls from './AddCommentForm.module.scss';


export interface AddCommentFormProps {
   className?: string;
   onSendComment: (text: string) => void;
}

const reducers: ReducersList = {addCommentForm: addCommentFormReducer}

const AddCommentForm = (props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation()
    const dispatch = useAppDispatch();
    const text = useSelector(getAddCommentFormText);

    const onChangeText = useCallback((text) => {
        dispatch(addCommentFormActions.setText(text))
    }, [dispatch]);

    const onSendWrapper = useCallback(() => {
        onSendComment(text || '');
        onChangeText('');
    }, [onSendComment, text, onChangeText])

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
            <HStack className={classNames('', {}, [className])} max>
                <Input
                    id='addCommentForm'
                    onChange={onChangeText}
                    placeholder={t('AddCommentForm.placeholder')}
                    value={text}
                />
                <Button
                    className={cls.submitBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSendWrapper}
                >
                    {t('AddCommentForm.submitBtn')}
                </Button>
            </HStack>
        </DynamicReducerLoader>
    );
}

export default AddCommentForm;