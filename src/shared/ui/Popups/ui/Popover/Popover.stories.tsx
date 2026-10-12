import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from './Popover';
import { Button, ButtonTheme } from '../../../Button/Button';
import { Text } from '../../../Text/Text';
import { ContainerDecorator } from 'shared/config/storybook/decorators/ContainerDecorator';
import { ThemeDecorator } from 'shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Popups/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        Story => <div style={{paddingInline: 600, paddingBlock: 300}}><Story /></div>
    ]
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover { ...args } />;

// eslint-disable-next-line i18next/no-literal-string
const trigger = <Button theme={ButtonTheme.OUTLINE}>Trigger btn</Button>
// eslint-disable-next-line i18next/no-literal-string
const content = <Text title={'Popover content'} text={'Another popover content'} />

export const Primary = Template.bind({});
Primary.args = {
    trigger: trigger,
    children: content,
    direction: 'bottom right',
};
Primary.decorators = [];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    trigger: trigger,
    children: content,
    direction: 'bottom right',
};
PrimaryDark.decorators = [
    ThemeDecorator(Theme.DARK)
];

export const PrimaryTopDirection = Template.bind({});
PrimaryTopDirection.args = {
    trigger: trigger,
    children: content,
    direction: 'top left',
};
PrimaryTopDirection.decorators = [];
