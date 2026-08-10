import { classNames } from 'shared/lib/classNames/classNames';
import ListViewIcon from 'shared/assets/icons/list-view-icon.svg';
import TileViewIcon from 'shared/assets/icons/tile-view-icon.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { ArticleListView } from '../../model/types/Article';
import cls from './ArticleViewSelector.module.scss';
import { HStack } from 'shared/ui/Stack';


interface ArticleViewSelectorProps {
   className?: string;
   view: ArticleListView;
   onViewChange?: (view: ArticleListView) => void;
}

const viewTypes: {type: ArticleListView, icon: JSX.Element}[] = [
    {
        type: ArticleListView.LIST,
        icon: <ListViewIcon />
    },
    {
        type: ArticleListView.TILE,
        icon: <TileViewIcon />
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, view, onViewChange} = props;

    const onClick = (newView: ArticleListView) => () => {
        onViewChange?.(newView);
    }


    return (
        <HStack
            className={classNames(cls.ArticleViewSelector, {}, [className])}
            gap={'4'}
        >
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.type}
                    theme={ButtonTheme.ICON}
                    onClick={onClick(viewType.type)}
                    className={classNames('', {[cls.notSelected]: view !== viewType.type}, [])}
                >
                    {viewType.icon}
                </Button>
            ))}
        </HStack>
    );
}
