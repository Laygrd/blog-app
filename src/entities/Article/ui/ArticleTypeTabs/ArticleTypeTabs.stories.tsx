import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';

export default {
    title: 'entities/Article/ArticleTypeTabs',
    component: ArticleTypeTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs { ...args } />;

export const Default = Template.bind({});
Default.args = {

};
Default.decorators = [];
