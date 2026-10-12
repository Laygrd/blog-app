import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import TestIcon from 'shared/assets/tests/edit-tests-icon.svg';
import { Icon } from './Icon';

export default {
    title: 'shared/Icon',
    component: Icon,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = (args) => <Icon { ...args } />;

export const Primary = Template.bind({});
Primary.args = {
    Svg: TestIcon
};
Primary.decorators = [];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    Svg: TestIcon
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryExcludeFill = Template.bind({});
PrimaryExcludeFill.args = {
    Svg: TestIcon,
    excludeFill: true
};
PrimaryExcludeFill.decorators = [];

export const PrimaryDarkExcludeFill = Template.bind({});
PrimaryDarkExcludeFill.args = {
    Svg: TestIcon,
    excludeFill: true
};
PrimaryDarkExcludeFill.decorators = [ThemeDecorator(Theme.DARK)];