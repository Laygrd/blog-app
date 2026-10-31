import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProfileRating from './ProfileRating';
import withMock from 'storybook-addon-mock';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'features/ProfileRating/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        withMock,
    ]
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => <ProfileRating { ...args } />;

export const Primary = Template.bind({});
Primary.args = { profileId: '2'};
Primary.decorators = [StoreDecorator({ user: { authData: { id: '1'} }})];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [
                {
                    "userId": 1,
                    "profileId": "2",
                    "rate": 4,
                    "feedback": "Лучший автор",
                    "id": "WhawjtI"
                }
            ],

            
        },
    ],
}

export const PrimaryDark = Template.bind({});
PrimaryDark.args = { profileId: '2' };
PrimaryDark.decorators = [StoreDecorator({ user: { authData: { id: '1'} }}), ThemeDecorator(Theme.DARK)];
PrimaryDark.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [
                {
                    "userId": 1,
                    "profileId": "2",
                    "rate": 4,
                    "feedback": "Лучший автор",
                    "id": "WhawjtI"
                }
            ],

            
        },
    ],
}

export const WithoutRate = Template.bind({});
WithoutRate.args = { profileId: '2'};
WithoutRate.decorators = [StoreDecorator({ user: { authData: { id: '1'} }})];
WithoutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [],  
        },
    ],
}

export const WithoutRateDark = Template.bind({});
WithoutRateDark.args = { profileId: '2' };
WithoutRateDark.decorators = [StoreDecorator({ user: { authData: { id: '1'} }}), ThemeDecorator(Theme.DARK)];
WithoutRateDark.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [], 
        },
    ],
}

export const IsLoading = Template.bind({});
IsLoading.args = { profileId: '2' };
IsLoading.decorators = [StoreDecorator({ user: { authData: { id: '1'} }})];
IsLoading.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [],
            delay: 9999999,
        },
    ],
}

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = { profileId: '2' };
IsLoadingDark.decorators = [StoreDecorator({ user: { authData: { id: '1'} }}), ThemeDecorator(Theme.DARK)];
IsLoadingDark.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1&profileId=2`,
            method: 'GET',
            status: 200,
            response: [],
            delay: 9999999,
        },
    ],
}