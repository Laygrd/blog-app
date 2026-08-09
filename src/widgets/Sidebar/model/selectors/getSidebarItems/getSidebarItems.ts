import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { RouterPaths } from "shared/config/router/routerVars";
import HomePageIcon from 'shared/assets/icons/home-icon.svg';
import AboutPageIcon from 'shared/assets/icons/about-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import ArticlesIcon from 'shared/assets/icons/articles-icon.svg';
import { SidebarItemType } from "../../types/SidebarItemT";


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RouterPaths.main,
                Icon: HomePageIcon,
                text: 'Sidebar.main_page',
            },
            {
                path: RouterPaths.about,
                Icon: AboutPageIcon,
                text: 'Sidebar.about_page',
            },
        ]
        if (userData) {
            sidebarItemsList.push({
                path: `${RouterPaths.profiles}${userData.id}`,
                Icon: ProfileIcon,
                text: 'Sidebar.profile_page',
                authOnly: true,
            },
            {
                path: RouterPaths.articles,
                Icon: ArticlesIcon,
                text: 'Sidebar.articles_page',
                authOnly: true,
            })
        }
        return sidebarItemsList;
    }
)