import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { LangSwitcher } from "widgets/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";

import { VStack } from "shared/ui/Stack";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { classNames } from "shared/lib/classNames/classNames";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import cls from "./Sidebar.module.scss";


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const onToggle = () => setCollapsed(prev => !prev);
    const sidebarItemsList = useSelector(getSidebarItems);

    const itemsList = useMemo(() => sidebarItemsList.map((item) => 
        (
            <SidebarItem 
                itemData={item}
                key={item.path}
                collapsed={collapsed}
            />
        )
    ), [collapsed, sidebarItemsList]);

    // mb navbar in <aside />?

    return (
        <aside
            data-testid='sidebar'
            className={ classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className]) }
        >
            <VStack role="navigation" gap={'16'} className={cls.links}>
                { itemsList }
            </VStack>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher 
                    shortLngDisplay={collapsed}
                />
            </div>
            <Button
                data-testid='collapse_btn'
                onClick={onToggle}
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls['collapse_button']}
            >
                {collapsed ? '>>>' : '<<<'}
            </Button>
        </aside>
    );
});
Sidebar.displayName = 'Sidebar';
