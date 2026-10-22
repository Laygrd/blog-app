import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';

import { Card } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';


interface RatingCardProps {
    id?: string;
    className?: string;
    onAccept?: (starCount: number, feedback?: string) => void;
    onCancel?: (starCount: number) => void;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        id,
        className,
        onAccept,
        onCancel,
        title,
        feedbackTitle,
        hasFeedback,
    } = props;

    const { t } = useTranslation()

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [starCount, setStarCount] = useState<number>(0);
    const [feedback, setFeedback] = useState('');

    const onSelectStarsHandler = useCallback((starCount: number) => {
        setStarCount(starCount);
        if (hasFeedback) {
            setIsFeedbackOpen(true);
        } else {
            onAccept?.(starCount);
        }
    }, [hasFeedback, onAccept]);

    const onAcceptHandler = useCallback(() => {
        setIsFeedbackOpen(false);
        onAccept?.(starCount, feedback);
    }, [feedback, onAccept, starCount]);

    const onCancelHandler = useCallback(() => {
        setIsFeedbackOpen(false);
        onCancel?.(starCount);
    }, [onCancel, starCount]);

    const modalContent = (
        <>
            { feedbackTitle &&
                <Text title={feedbackTitle} />
            }
            <Input
                id={`feedback_input_${id}`}
                placeholder={t('RatingCard.modalFeedbackInput')}
            />
        </>
    );

    return (
        <Card className={classNames('', {}, [className])}>
            <VStack
                gap={'16'}
                align={'center'}
                justify={'center'}
                max
            >
                { title &&
                    <Text title={title} />
                }
                <StarRating
                    onSelect={onSelectStarsHandler}
                    size={40}
                />
            </VStack>
            <BrowserView>
                <Modal
                    isOpen={isFeedbackOpen}
                >
                    <VStack align={'center'} max>
                        { modalContent }
                        <HStack max gap={'16'} justify={'end'}>
                            <Button
                                onClick={onCancelHandler}
                                theme={ButtonTheme.OUTLINE}
                            >
                                { t('RatingCard.cancelBtn') }
                            </Button>
                            <Button
                                onClick={onAcceptHandler}
                                theme={ButtonTheme.OUTLINE}
                            >
                                { t('RatingCard.submitBtn') }
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isFeedbackOpen} onClose={() => onCancelHandler()}>
                    <VStack max justify={'center'}>
                        { modalContent }
                        <Button
                            onClick={onAcceptHandler}
                            theme={ButtonTheme.OUTLINE}
                            fullwidth
                            
                        >
                            { t('RatingCard.submitBtn') }
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
}
