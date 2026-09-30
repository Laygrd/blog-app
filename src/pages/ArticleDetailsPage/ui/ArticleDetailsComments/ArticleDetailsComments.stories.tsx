import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { SuspenseDecorator } from 'shared/config/storybook/decorators/SuspenseDecorator';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsComments>;

const comments = {
    ids: [
        'T5Z4IaX',
        '1vTas4G',
                    
    ],
    entities: {
        T5Z4IaX: {
            articleId: '2',
            userId: 1,
            text: 'Comment',
            id: 'T5Z4IaX',
            user: {
                id: '1',
                username: 'admin',
                password: '123',
                roles: [
                    // @ts-ignore
                    'ADMIN'
                ],
                avatarUrl: AvatarDefault,
            }
        },
        '1vTas4G': {
            articleId: '2',
            userId: 1,
            text: 'Another comment',
            id: '1vTas4G',
            user: {
                id: '1',
                username: 'admin',
                password: '123',
                roles: [
                    // @ts-ignore
                    'ADMIN'
                ],
                avatarUrl: AvatarDefault,
            }
        },          
    }
}

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => <ArticleDetailsComments { ...args } />;

export const Primary = Template.bind({});
Primary.args = { };
Primary.decorators = [
    // @ts-ignore
    StoreDecorator({ articleDetailsPage: { comments: comments}}),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = { };
PrimaryDark.decorators = [
    // @ts-ignore
    StoreDecorator({ articleDetailsPage: { comments: comments}}),
    ThemeDecorator(Theme.DARK)
];

export const IsLoading = Template.bind({});
IsLoading.args = { };
IsLoading.decorators = [
    // @ts-ignore
    StoreDecorator({ articleDetailsPage: { comments: {...comments, isLoading: true}}}),
];

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = { };
IsLoadingDark.decorators = [
    // @ts-ignore
    StoreDecorator({ articleDetailsPage: { comments: {...comments, isLoading: true}}}),
    ThemeDecorator(Theme.DARK)
];
