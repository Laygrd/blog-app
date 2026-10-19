import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useNotifications } from '../../api/notificationsApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';


interface NotificationListProps {
   className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                className={classNames('', {}, [className])}
                gap={'16'}
                max
            >
                <Skeleton height={'74px'} border={'8px'}/>
                <Skeleton height={'74px'} border={'8px'}/>
                <Skeleton height={'74px'} border={'8px'}/>
            </VStack>
        )
    }

    if (!data) {
        return (
            <VStack 
                className={classNames('', {}, [className])}
                align='center'
                justify='center'
                max 
            >
                <Text title={t('NotificationList.empty')}/>
            </VStack>
        )
    }

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap={'16'}
            max
        >
            {
                data.map(item => {
                    return (
                        <NotificationItem
                            key={item.id}
                            item={item}
                        />
                    )
                })
            }
        </VStack>
    );
}
