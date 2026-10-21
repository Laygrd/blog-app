import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StarRating } from './StarRating';
import { ContainerDecorator } from '@/shared/config/storybook/decorators/ContainerDecorator';

export default {
    title: 'shared/StarRating',
    component: StarRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating { ...args } />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];
