import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Article, ArticleListView } from '../../model/types/Article';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { ArticleListItem } from './ArticleListItem';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';


export default {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItem>;

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

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem { ...args } />;

export const PrimaryTile = Template.bind({});
PrimaryTile.args = {
    article: article,
    view: ArticleListView.TILE,
    isLoading: false
};
PrimaryTile.decorators = [];

export const DarkTile = Template.bind({});
DarkTile.args = {
    article: article,
    view: ArticleListView.TILE,
    isLoading: false
};
DarkTile.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryTileIsLoading = Template.bind({});
PrimaryTileIsLoading.args = {
    article: article,
    view: ArticleListView.TILE,
    isLoading: true
};
PrimaryTileIsLoading.decorators = [];

export const DarkTileIsLoading = Template.bind({});
DarkTileIsLoading.args = {
    article: article,
    view: ArticleListView.TILE,
    isLoading: true
};
DarkTileIsLoading.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryList = Template.bind({});
PrimaryList.args = {
    article: article,
    view: ArticleListView.LIST,
    isLoading: false
};
PrimaryList.decorators = [];

export const DarkList = Template.bind({});
DarkList.args = {
    article: article,
    view: ArticleListView.LIST,
    isLoading: false
};
DarkList.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryListIsLoading = Template.bind({});
PrimaryListIsLoading.args = {
    article: article,
    view: ArticleListView.LIST,
    isLoading: true
};
PrimaryListIsLoading.decorators = [];

export const DarkListIsLoading = Template.bind({});
DarkListIsLoading.args = {
    article: article,
    view: ArticleListView.LIST,
    isLoading: true
};
DarkListIsLoading.decorators = [ThemeDecorator(Theme.DARK)];