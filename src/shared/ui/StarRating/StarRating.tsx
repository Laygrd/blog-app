import { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star-icon.svg';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';


interface StarRatingProps {
   className?: string;
   onSelect?: (starRating: number) => void;
   size?: number;
   selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size,
        selectedStars = 0,
    } = props;

    const [currenStarsCount, setCurrentStarsCount] = useState(0);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const mods = useMemo(() => ({
        [cls.selected]: isSelected
    }), [isSelected])

    const onHover = useCallback((starRating: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starRating);
        }
    },[isSelected]);

    const onLeave = useCallback(() => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    }, [isSelected]);

    const onClick = useCallback((starRating: number) => () => {
        if (!isSelected) {
            onSelect?.(starRating);
            setIsSelected(true);
            setCurrentStarsCount(starRating);
        }
    }, [isSelected, onSelect]);

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            { stars.map((starNumber) => (
                <Icon
                    className={classNames(cls.starIcon, mods, [])}
                    key={starNumber}
                    Svg={StarIcon}
                    onClick={onClick(starNumber)}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    excludeFill={ starNumber > currenStarsCount}
                    width={size}
                    height={size}
                /> 
            ))}
        </div>
    );
}
