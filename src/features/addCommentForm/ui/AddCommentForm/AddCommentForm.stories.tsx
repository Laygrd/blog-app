import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/decorators/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import AddCommentForm from './AddCommentForm';


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
