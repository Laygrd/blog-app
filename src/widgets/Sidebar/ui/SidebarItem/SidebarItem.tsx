import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUserAuthData } from "@/entities/User";

import { Icon, IconTheme } from "@/shared/ui/Icon/Icon";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { SidebarItemType } from '../../model/types/SidebarItemT';
import cls from "./SidebarItem.module.scss";


interface SidebarItemProps {
    itemData: SidebarItemType;
    collapsed?: boolean;
}

export const SidebarItem = memo(({ itemData, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation()

    const isAuth = useSelector(getUserAuthData);

    if (!isAuth && itemData.authOnly) {
        return null;
    };

    return(
        <AppLink
            data-testid="sidebar-item"
            className={classNames(cls.SidebarItem, {[cls.collapsed]: collapsed})}
            theme={AppLinkTheme.INVERTED}
            to={itemData.path}
        >
            <Icon theme={IconTheme.INVERTED_PIRMARY} Svg={itemData.Icon}/>
            <span className={cls.link}>
                {t(itemData.text)}
            </span>
        </AppLink>
    );
});
SidebarItem.displayName = 'SidebarItem';
