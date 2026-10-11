import { NotificationList } from 'entities/Notification';

import { Popover } from 'shared/ui/Popups';
import { Icon, IconTheme } from 'shared/ui/Icon/Icon';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import NotificationsIcon from 'shared/assets/icons/notifications-icon.svg';
import cls from './NotificationButton.module.scss';


interface NotificationButtonProps {
   className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            className={classNames(cls.NotificationButton, {}, [className])}
            trigger={(
                <Button theme={ButtonTheme.ICON}>
                    <Icon
                        theme={IconTheme.INVERTED_PIRMARY} 
                        Svg={ NotificationsIcon }
                    />
                </Button>
            )}
            direction={'bottom left'}
        >
            <NotificationList className={cls.notifications}/>
        </Popover>
    );
}
