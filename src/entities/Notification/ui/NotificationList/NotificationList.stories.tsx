import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotificationList } from './NotificationList';
import type { Notification } from '../../model/types/notification';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';


export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 100}}><Story /></div>,
        withMock,
    ]
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList { ...args } />;

const notification: Notification = {
    id: '1',
    userId: '1',
    isChecked: false,
    title: 'New notification!',
    description: 'Some notification text',
    href: undefined,
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({})
];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {...notification, id: '1'},
                {...notification, id: '2'},
                {...notification, id: '3'},
                {...notification, id: '4'}
            ],
            
        },
    ],
};

export const IsLoading = Template.bind({});
IsLoading.args = {};
IsLoading.decorators = [
    StoreDecorator({})
];
IsLoading.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            delay: 99999999,
            response: [],
        },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK)
];
PrimaryDark.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {...notification, id: '1'},
                {...notification, id: '2'},
                {...notification, id: '3'},
                {...notification, id: '4'}
            ],
            
        },
    ],
};

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = {};
IsLoadingDark.decorators = [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK)
];
IsLoadingDark.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            delay: 99999999,
            response: [],
        },
    ],
};