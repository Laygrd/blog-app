import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';

export default {
    title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
    component: ArticleDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPageHeader>;

const Template: ComponentStory<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader { ...args } />;

export const CanEdit = Template.bind({});
CanEdit.args = {

};
CanEdit.decorators = [StoreDecorator({
    articleDetails: {
        data: {
            user: {id: '1'}
        }
    },
    user: {
        authData: {id: '1'}
    }
})];

export const CantEdit = Template.bind({});
CantEdit.args = {

};
CantEdit.decorators = [StoreDecorator({
    articleDetails: {
        data: {
            user: {id: '1'}
        }
    },
    user: {
        authData: {id: '2'}
    }
})];