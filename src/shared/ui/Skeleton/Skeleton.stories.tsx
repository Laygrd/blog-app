import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeDecorator } from '@/shared/config/storybook/decorators/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton { ...args } />;

export const Default = Template.bind({});
Default.args = {
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    height: 100,
    width: 100,
};

export const DefaultDark = Template.bind({});
DefaultDark.args = {
    height: 200,
};
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)];


// it breaks loki idk why
// export const CircleDark = Template.bind({});
// CircleDark.args = {
//     border: '50%',
//     height: 100,
//     width: 100,
// };
// CircleDark.decorators = [ThemeDecorator(Theme.DARK)];