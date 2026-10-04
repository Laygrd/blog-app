import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';


export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard { ...args } />;

export const Default = Template.bind({});
Default.args = {
    comment: {
        id: '1',
        user: {id: '1', username: 'username1', avatarUrl: AvatarDefault},
        text: 'some comment'
    }
};
Default.decorators = [];

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
};
IsLoading.decorators = [];
