import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Notification } from '../../model/types/notification';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';


interface NotificationItemProps {
   className?: string;
   item: Notification;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const {
        className,
        item,
    } = props;

    if (item.href) {
        return (
            <AppLink
                theme={AppLinkTheme.CLEAR}
                to={item.href}
                target='__blank'
                max
            >
                <Card
                    className={classNames(cls.NotificationItem, {}, [className])}
                    theme={CardTheme.OUTLINE}
                >
                    <Text
                        size={TextSize.S}
                        title={item.title}
                        text={item.description}
                    />
                </Card>
            </AppLink>
        );
    }

    return (
        <Card
            className={classNames(cls.NotificationItem, {}, [className])}
            theme={CardTheme.OUTLINE}
        >
            <Text
                size={TextSize.S}
                title={item.title}
                text={item.description}
            />
        </Card>
    );
}
