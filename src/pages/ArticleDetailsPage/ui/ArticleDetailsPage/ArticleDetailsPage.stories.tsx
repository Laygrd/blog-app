// eslint-disable
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { Article } from 'entities/Article';
import { ArticleType, ArticleBlockType } from 'entities/Article/model/types/Article';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { SuspenseDecorator } from 'shared/config/storybook/decorators/SuspenseDecorator';
import withMock from 'storybook-addon-mock';


export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleDetailsPage>;

const data: Article = {
    id: "1",
    title: "Test article test article test article",
    subtitle: "Test article test article test article",
    img: JSLogo,
    views: 100,
    user: {
        id: '1',
        username: 'admin'
    },
    createdAt: "01.01.0001",
    type: [ArticleType.IT],
    blocks: [
        {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "test text block",
            paragraphs: [
                // eslint-disable-next-line max-len
                "     Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros metus, aliquet a nisi at, rutrum aliquam lectus. Integer ornare ictum libero, a auctor dui bibendum eget. Nullam imperdiet ipsum quis lacus posuere sodales. Cras non malesuada sapien. Phasellus consectetur luctus sem, gravida elementum leo tempor ut. Nullam nec suscipit nulla, vitae porta neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas varius lorem vitae leo placerat placerat. Sed eu molestie est, vitae efficitur justo. Nulla fermentum metus lorem, in sagittis lorem pharetra at.",
            ]
        },
        {
            id: "2",
            type: ArticleBlockType.CODE,
            // eslint-disable-next-line max-len
            code: '//test code block \nconsole.log("hello from storybook")\n\nsetTimeout(() => {\n    console.log("hello from sb again");\n}, 1000)'
        },
        {
            id: "3",
            type: ArticleBlockType.IMAGE,
            src: JSLogo,
            title: 'test image block title'
        }
    ]
}

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


const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage { ...args } />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        articleDetails: {
            data: data
        },
        articleDetailsPage: {
            // @ts-ignore
            comments: comments,
        }
    })
];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: 'GET',
            status: 200,
            response: [
                {...data, id: '1'},
                {...data, id: '2'},
                {...data, id: '3'},
            ],
            
        },
    ],
};

export const IsLoading = Template.bind({});
IsLoading.args = {};
IsLoading.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true
        }
    }),

];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({articleDetails: {
    error: 'error'
}})];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [
    StoreDecorator({
        articleDetails: {
            data: data
        },
        articleDetailsPage: {
            // @ts-ignore
            comments: comments,
        }
    }),
    ThemeDecorator(Theme.DARK),
];
PrimaryDark.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: 'GET',
            status: 200,
            response: [
                {...data, id: '1'},
                {...data, id: '2'},
                {...data, id: '3'},
            ],
            
        },
    ],
};

export const IsLoadingDark = Template.bind({});
IsLoadingDark.args = {};
IsLoadingDark.decorators = [
    StoreDecorator({articleDetails: {
        isLoading: true
    }}),
    ThemeDecorator(Theme.DARK),
];

export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    StoreDecorator({articleDetails: {
        error: 'error'
    }}),
    ThemeDecorator(Theme.DARK),
];