import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RatingCard } from './RatingCard';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard { ...args } />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const WithTitle = Template.bind({});
WithTitle.args = {
    title: 'Rate this component!'
};
WithTitle.decorators = [];

export const WithTitleDark = Template.bind({});
WithTitleDark.args = {
    title: 'Rate this component!'
};
WithTitleDark.decorators = [ThemeDecorator(Theme.DARK)];