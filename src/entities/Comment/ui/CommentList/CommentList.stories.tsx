import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { Comment } from '../../model/types/comment';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList { ...args } />;

const comments: Comment[] = [
    {
        id: '1',
        user: {id: '1', username: 'username1', avatarUrl: AvatarDefault},
        text: 'some comment'
    },
    {
        id: '2',
        user: {id: '1', username: 'username2', avatarUrl: AvatarDefault},
        text: 'some comment2'
    },
    {
        id: '3',
        user: {id: '1', username: 'username1', avatarUrl: AvatarDefault},
        text: 'some comment3'
    },
]

export const Default = Template.bind({});
Default.args = {
    comments: comments
};
Default.decorators = [];

export const IsLoading = Template.bind({});
IsLoading.args = {
    isLoading: true,
    comments: comments
};
IsLoading.decorators = [];
