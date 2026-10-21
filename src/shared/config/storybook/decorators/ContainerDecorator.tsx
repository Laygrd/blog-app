import { Story } from "@storybook/react";

/* eslint-disable react/prop-types */
export interface ContainerDecoratorProps {
    height?: string;
    width?: string;
    bgColor?: string;
    flexDirection?: 'row' | 'column'
}

export const ContainerDecorator = (props: ContainerDecoratorProps) => (StoryComponent: Story) => {

    const { 
        height = '100%',
        width = '100%',
        bgColor,
        flexDirection,
    } = props;

    return (
        <div style={{ height, width, display: 'flex', alignItems: 'stretch', backgroundColor: bgColor, flexDirection }}>
            <StoryComponent />
        </div>
    )
}
