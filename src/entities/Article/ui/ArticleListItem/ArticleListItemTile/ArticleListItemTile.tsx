import { HTMLAttributeAnchorTarget } from "react";

import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import { Text, TextSize } from "shared/ui/Text/Text";
import { HStack, VStack } from "shared/ui/Stack";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Card } from "shared/ui/Card/Card";
import { RouterPaths } from "shared/config/router/routerVars";
import { classNames } from "shared/lib/classNames/classNames";

import { Article  } from "../../../model/types/Article";
import cls from './ArticleListItemTile.module.scss';


export interface ArticleListItemTileProps {
    className?: string;
    article: Article;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    onOpenCb?: () => void;
}

export const ArticleListItemTile = (props: ArticleListItemTileProps) => {
    const {
        className,
        article,
        target,
        onOpenCb,
        isLoading
    } = props;

    const articleDetailsPath = `${RouterPaths.article_details}${article.id}`;
    
    if (isLoading) {
        return(
            <div className={classNames(cls.ArticleListItem_tile, {}, [className])}>
                <Card>
                    <VStack max gap={'8'}>
                        <Skeleton width={200} height={200}/>

                        <HStack justify={'between'} max>
                            <Skeleton className={cls.type} width={80} height={24}/>
                            <Skeleton className={cls.views} width={50} height={24}/>
                        </HStack>
                    
                        <Skeleton width={'100%'} height={24}/>
                    </VStack>
                </Card>
            </div>
        );
    };

    return (
        <AppLink
            className={classNames(cls.ArticleListItem_tile, {}, [className])}
            to={articleDetailsPath}
            target={target}
            onClick={onOpenCb}
            role={'article'}
        >
            <Card>
                <VStack max gap={'8'}>

                    <div className={cls.imageWrapper}>
                        <img 
                            className={cls.articleImage}
                            src={article.img}
                        />
                        <Text
                            className={cls.created}
                            text={article.createdAt}
                        />
                    </div>

                    <HStack justify={'between'} max>
                        <Text
                            className={cls.type}
                            text={article.type.join(', ')}
                            size={TextSize.M}
                        />
                        <HStack gap={'4'} align={"center"} >
                            <Text
                                text={String(article.views)} 
                                size={TextSize.M}
                            />
                            <EyeIcon />
                        </HStack>
                    </HStack>

                    <Text
                        className={cls.title}
                        text={article.title}
                        size={TextSize.M}
                    />
                </VStack>
            </Card>
        </AppLink>
    )
};
