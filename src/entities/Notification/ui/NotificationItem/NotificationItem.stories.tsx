import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../../model/types/notification';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const notification: Notification = {
    id: '1',
    userId: '1',
    isChecked: false,
    title: 'New notification!',
    description: 'Some notification text',
    href: undefined,
}

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    item: notification
};
Primary.decorators = [];
