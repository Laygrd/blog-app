import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import type { Notification } from '@/entities/Notification/model/types/notification';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { NotificationButton } from './NotificationButton';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { ContainerDecorator } from '@/shared/config/storybook/decorators/ContainerDecorator';


export default {
    title: 'features/NotificationButton/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 100}}><Story /></div>,
        withMock,
    ]
} as ComponentMeta<typeof NotificationButton>;

const notification: Notification = {
    id: '1',
    userId: '1',
    isChecked: false,
    title: 'New notification!',
    description: 'Some notification text',
    href: undefined,
}

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton { ...args } />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({}),
    ContainerDecorator({bgColor: 'grey'})
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

export const IsLoading = Template.bind({});
IsLoading.args = {};
IsLoading.decorators = [
    StoreDecorator({}),
    ContainerDecorator({bgColor: 'grey'})
];
IsLoading.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [],
            delay: 9999999,
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
            response: [],
            delay: 9999999,
        },
    ],
};