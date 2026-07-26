import { ComponentStory, ComponentMeta } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';
import { Article } from 'entities/Article';
import { ArticleType, ArticleBlockType } from 'entities/Article/model/types/Article';
import JSLogo from 'shared/assets/tests/JavaScript-logo.jpg';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
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


const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage { ...args } />;

export const Default = Template.bind({});
Default.args = {};
Default.decorators = [StoreDecorator({articleDetails: {
    data: data
}})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({articleDetails: {
    isLoading: true
}})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({articleDetails: {
    error: 'error'
}})];

export const DefaultDark = Template.bind({});
DefaultDark.args = {};
DefaultDark.decorators = [
    StoreDecorator({articleDetails: {
        data: data
    }}),
    ThemeDecorator(Theme.DARK),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
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