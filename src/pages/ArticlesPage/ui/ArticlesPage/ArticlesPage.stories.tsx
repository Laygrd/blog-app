import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Article, ArticleListView } from 'entities/Article';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import ArticlesPage from './ArticlesPage';


export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage { ...args } />;

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

const articles_entities = {
    "1": article,
    "2": {...article, id: "2"},
    "3": {...article, id: "3"},
    "4": {...article, id: "4"},
    "5": {...article, id: "5"},
    "6": {...article, id: "6"},
    "7": {...article, id: "7"},
    "8": {...article, id: "8"},
    "9": {...article, id: "9"},
};

const articles_id = ["1","2","3","4","5","6","7","8","9"];

export const PrimaryList = Template.bind({});
PrimaryList.args = {};
PrimaryList.decorators = [StoreDecorator({
    articlesPage: {entities: articles_entities, ids: articles_id, isLoading: false, view: ArticleListView.LIST}
})];

export const PrimaryTile = Template.bind({});
PrimaryTile.args = {};
PrimaryTile.decorators = [StoreDecorator({
    articlesPage: {entities: articles_entities, ids: articles_id, isLoading: false, view: ArticleListView.TILE}
})];

export const PrimaryListIsLoading = Template.bind({});
PrimaryListIsLoading.args = {};
PrimaryListIsLoading.decorators = [StoreDecorator({
    articlesPage: {entities: {}, ids: [], isLoading: true, view: ArticleListView.LIST}
})];

export const PrimaryTileIsLoading = Template.bind({});
PrimaryTileIsLoading.args = {};
PrimaryTileIsLoading.decorators = [StoreDecorator({
    articlesPage: {entities: {}, ids: [], isLoading: true, view: ArticleListView.TILE}
})];

export const DarkList = Template.bind({});
DarkList.args = {};
DarkList.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    articlesPage: {entities: articles_entities, ids: articles_id, isLoading: false, view: ArticleListView.LIST}
})];

export const DarkTile = Template.bind({});
DarkTile.args = {};
DarkTile.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    articlesPage: {entities: articles_entities, ids: articles_id, isLoading: false, view: ArticleListView.TILE}
})];

export const DarkListIsLoading = Template.bind({});
DarkListIsLoading.args = {};
DarkListIsLoading.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    articlesPage: {entities: {}, ids: [], isLoading: true, view: ArticleListView.LIST}
})];

export const DarkTileIsLoading = Template.bind({});
DarkTileIsLoading.args = {};
DarkTileIsLoading.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    articlesPage: {entities: {}, ids: [], isLoading: true, view: ArticleListView.TILE}
})];
