import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Article, ArticleListView } from 'entities/Article';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { ArticleList } from './ArticleList';




export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

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

const articles_list = [
    {...article, id: "1"},
    {...article, id: "2"},
    {...article, id: "3"},
    {...article, id: "4"},
    {...article, id: "5"},
    {...article, id: "6"},
    {...article, id: "7"},
    {...article, id: "8"},
    {...article, id: "9"},
];

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList { ...args } />;

export const PrimaryList = Template.bind({});
PrimaryList.args = {
    articles: articles_list,
    view: ArticleListView.LIST,
    isLoading: false
};
PrimaryList.decorators = [];

export const PrimaryTile = Template.bind({});
PrimaryTile.args = {
    articles: articles_list,
    view: ArticleListView.TILE,
    isLoading: false
};
PrimaryTile.decorators = [];

export const DarkList = Template.bind({});
DarkList.args = {
    articles: articles_list,
    view: ArticleListView.LIST,
    isLoading: false
};
DarkList.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkTile = Template.bind({});
DarkTile.args = {
    articles: articles_list,
    view: ArticleListView.TILE,
    isLoading: false
};
DarkTile.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryListIsLoading = Template.bind({});
PrimaryListIsLoading.args = {
    articles: [],
    view: ArticleListView.LIST,
    isLoading: true
};
PrimaryListIsLoading.decorators = [];

export const PrimaryTileIsLoading = Template.bind({});
PrimaryTileIsLoading.args = {
    articles: [],
    view: ArticleListView.TILE,
    isLoading: true
};
PrimaryTileIsLoading.decorators = [];

export const DarkListIsLoading = Template.bind({});
DarkListIsLoading.args = {
    articles: [],
    view: ArticleListView.LIST,
    isLoading: true
};
DarkListIsLoading.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkTileIsLoading = Template.bind({});
DarkTileIsLoading.args = {
    articles: [],
    view: ArticleListView.TILE,
    isLoading: true
};
DarkTileIsLoading.decorators = [ThemeDecorator(Theme.DARK)];