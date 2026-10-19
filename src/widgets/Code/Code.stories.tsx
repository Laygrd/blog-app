import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code { ...args } />;


// eslint-disable-next-line max-len
const text: string = "content = (\n  <>\n      <div className={cls.avatarWrapper}>\n          <Avatar\n              size={200}\n              theme={AvatarTheme.ROUNDED}\n              src={data?.img}\n          />\n      </div>\n      <Text \n          title={data?.title}\n          text={data?.subtitle}\n      />\n  </>\n)\n"
        

export const Default = Template.bind({});
Default.args = {
    text: text
};
Default.decorators = [];

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    text: text
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];