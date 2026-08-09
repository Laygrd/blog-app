import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { SidebarItem } from "./SidebarItem";;
import MainPageIcon from 'shared/assets/icons/home-icon.svg';
import { SidebarItemType } from '../../model/types/SidebarItemType';

describe('widgets/SidebarItem', () => {
    test('default render', () => {
        const itemData: SidebarItemType = {
            path: '/',
            text: '',
            Icon: MainPageIcon,
        }
        componentRender(
            <SidebarItem 
                itemData={itemData}
            />
        )
        expect(screen.getByTestId("sidebar-item")).toBeInTheDocument();
    });
})