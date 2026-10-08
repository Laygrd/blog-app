import type { FC, SVGProps } from "react";


export interface SidebarItemType {
    path: string;
    Icon: FC<SVGProps<SVGSVGElement>>;
    text: string;
    authOnly?: boolean;
};