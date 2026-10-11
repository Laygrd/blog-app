import { DropdownDirection } from "../../../types/ui";
import cls from './popupStyles.module.scss';


export const mapDirectionClass: Record<DropdownDirection, string> = {
    'top left': cls.topLeftDirection,
    'top right': cls.topRightDirection,
    'bottom right': cls.bottomRightDirection,
    'bottom left': cls.bottomLeftDirection,
};
