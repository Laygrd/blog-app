import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { Article } from 'entities/Article';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

const article = {
    "id": "1",
    "title": "Test article Test article",
    "subtitle": "Test article Test article Test article",
    "img": JSLogo,
    "views": 1234,
    "createdAt": "01.01.0001",
    "user": {
        'id': '1',
        'username': 'admin',
        'avatarUrl': AvatarDefault,
    },
    "type": [
        "IT", "Science", 
    ],
    "blocks": [
        {
            "id": "1",
            "type": "TEXT",
            "paragraphs": [
                // eslint-disable-next-line max-len
                "     Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros metus, aliquet a nisi at, rutrum aliquam lectus. Integer ornare ictum libero, a auctor dui bibendum eget. Nullam imperdiet ipsum quis lacus posuere sodales. Cras non malesuada sapien. Phasellus consectetur luctus sem, gravida elementum leo tempor ut. Nullam nec suscipit nulla, vitae porta neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas varius lorem vitae leo placerat placerat. Sed eu molestie est, vitae efficitur justo. Nulla fermentum metus lorem, in sagittis lorem pharetra at."
            ]
        }
    ]
} as Article;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: 'GET',
            status: 200,
            response: [
                {...article, id: '1'},
                {...article, id: '2'},
                {...article, id: '3'},
            ],
            
        },
    ],
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
PrimaryDark.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: 'GET',
            status: 200,
            response: [
                {...article, id: '1'},
                {...article, id: '2'},
                {...article, id: '3'},
            ],
            
        },
    ],
};
