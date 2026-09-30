import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddCommentForm from './AddCommentForm';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'features/AddCommentForm',
    component: AddCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    onSendComment: action('onSendComment'),
};
Primary.decorators = [
    StoreDecorator({
        addCommentForm: {}
    })
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    onSendComment: action('onSendComment'),
};
PrimaryDark.decorators = [
    StoreDecorator({
        addCommentForm: {}
    }),
    ThemeDecorator(Theme.DARK)
];