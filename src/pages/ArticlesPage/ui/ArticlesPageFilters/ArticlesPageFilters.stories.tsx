import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticlesPageFilters } from './ArticlesPageFilters';
import { Article, ArticleListView, ArticleSortField, ArticleType } from 'entities/Article';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';

const article = {
    "id": "1",
    "title": "Test article Test article",
    "subtitle": "Test article Test article Test article",
    "img": '',
    "views": 1234,
    "createdAt": "01.01.0001",
    "user": {
        'id': '1',
        'username': 'admin',
        'avatarUrl': ''
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



export default {
    title: 'pages/ArticlesPage/ArticlesPageFilters',
    component: ArticlesPageFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters { ...args } />;

export const Default = Template.bind({});
Default.args = {

};
Default.decorators = [StoreDecorator({
    articlesPage: {
        entities: articles_entities, 
        ids: articles_id, 
        isLoading: false, 
        view: ArticleListView.TILE, 
        type: ArticleType.ALL,
        search: '',
        sort: ArticleSortField.TITLE,
        order: 'asc'
    }
})];
