import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppLink, AppLinkTheme } from './AppLink';
import { RouterDecorator } from 'shared/config/storybook/decorators/RouterDecorator';


export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    to: '/',
    children: 'link',
    theme: AppLinkTheme.PRIMARY
};
//Primary.decorators = [RouterDecorator];

export const Inverted = Template.bind({});
Inverted.args = {
    to: '/',
    children: 'link',
    theme: AppLinkTheme.INVERTED
};
//Inverted.decorators = [RouterDecorator];

export const Outline = Template.bind({});
Outline.args = {
    to: '/',
    children: 'link',
    theme: AppLinkTheme.OUTLINE
};
//Inverted.decorators = [RouterDecorator];

export const OutlineInverted = Template.bind({});
OutlineInverted.args = {
    to: '/',
    children: 'link',
    theme: AppLinkTheme.OUTLINE_INVERTED
};
//Inverted.decorators = [RouterDecorator];