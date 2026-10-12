import { useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from 'entities/Notification';

import { Popover } from 'shared/ui/Popups';
import { Drawer } from 'shared/ui/Drawer/Drawer';
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

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const onOpenDrawer = useCallback(() => setIsOpenDrawer(true), []);
    const onCloseDrawer = useCallback(() => setIsOpenDrawer(false), []);

    return (
        <>
            <BrowserView>
                <Popover
                    className={classNames('', {}, [className])}
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
                    <NotificationList className={cls.popoverNotifications}/>
                </Popover>
            </BrowserView>
            <MobileView>
                <Button
                    theme={ButtonTheme.ICON}
                    onClick={onOpenDrawer}
                >
                    <Icon
                        theme={IconTheme.INVERTED_PIRMARY} 
                        Svg={ NotificationsIcon }
                    />
                </Button>
                <Drawer
                    isOpen={isOpenDrawer}
                    onClose={onCloseDrawer}
                >
                    <NotificationList className={cls.drawerNotifications}/>
                </Drawer>
            </MobileView>
        </>
    );
}
