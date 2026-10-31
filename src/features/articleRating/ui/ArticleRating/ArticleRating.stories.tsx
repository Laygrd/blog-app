import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleRating from './ArticleRating';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
    title: 'features/ArticleRating/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        withMock,
    ]
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating { ...args } />;

export const Primary = Template.bind({});
Primary.args = { articleId: '1' };
Primary.decorators = [StoreDecorator({user: { authData: { id: '1' }}})];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    "id": "1",
                    "rate": "4",
                    "feedback": "Хорошая статья!",
                    "userId": "1",
                    "articleId": "2"
                }
            ],

            
        },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = { articleId: '1' };
PrimaryDark.decorators = [StoreDecorator({user: { authData: { id: '1' }}}), ThemeDecorator(Theme.DARK)];
PrimaryDark.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    "id": "1",
                    "rate": "4",
                    "feedback": "Хорошая статья!",
                    "userId": "1",
                    "articleId": "2"
                }
            ],

            
        },
    ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = { articleId: '1' };
WithoutRate.decorators = [StoreDecorator({user: { authData: { id: '1' }}})];
WithoutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};

export const WithoutRateDark = Template.bind({});
WithoutRateDark.args = { articleId: '1' };
WithoutRateDark.decorators = [StoreDecorator({user: { authData: { id: '1' }}}), ThemeDecorator(Theme.DARK)];
WithoutRateDark.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};



export const IsLoading = Template.bind({});
IsLoading.args = { articleId: '1' };
IsLoading.decorators = [StoreDecorator({user: { authData: { id: '1' }}})];
IsLoading.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
            delay: 9999999,
        },
    ],
};

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = { articleId: '1' };
IsLoadingDark.decorators = [StoreDecorator({user: { authData: { id: '1' }}}), ThemeDecorator(Theme.DARK)];
IsLoadingDark.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
            delay: 9999999,
        },
    ],
};