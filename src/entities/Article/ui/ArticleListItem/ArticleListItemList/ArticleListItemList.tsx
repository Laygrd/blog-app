import { HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import { Avatar, AvatarTheme } from "shared/ui/Avatar/Avatar";
import { Text, TextSize } from "shared/ui/Text/Text";
import { HStack, VStack } from "shared/ui/Stack";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Card } from "shared/ui/Card/Card";
import { RouterPaths } from "shared/config/router/routerVars";
import { classNames } from "shared/lib/classNames/classNames";

import { Article, ArticleBlockType, ArticleTextBlock } from "../../../model/types/Article";
import cls from './ArticleListItemList.module.scss';


export interface ArticleListItemListProps {
    className?: string;
    article: Article;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    onOpenCb?: () => void;
}

export const ArticleListItemList = (props: ArticleListItemListProps) => {
    const {
        className,
        article,
        target,
        onOpenCb,
        isLoading
    } = props;

    const { t } = useTranslation();

    const articleDetailsPath = `${RouterPaths.article_details}${article.id}`;
    
    if (isLoading) {

        return(
            <article className={classNames(cls.ArticleListItem_list, {}, [className])}>
                <Card >
                    <VStack gap={'16'} max>

                        {/* header */}
                        <HStack justify={'between'} max >
                            <Skeleton width={80} height={24}/>
                            <Skeleton width={100} height={24}/>
                        </HStack>

                        {/* title && type */}
                        <VStack gap={'4'} max>
                            <Skeleton width={'50%'} height={32}/>
                            <Skeleton className={cls.type} width={100} height={24}/>
                        </VStack>

                        {/* image && text */}
                        <VStack gap={'32'} max>
                            <Skeleton width={'100%'} height={350}/>
                            <Skeleton width={'100%'} height={120}/>
                        </VStack>

                        {/* footer */}
                        <HStack justify={'between'} max>
                            <Skeleton width={70} height={24}/>
                            <Skeleton width={50} height={24}/>
                        </HStack>

                    </VStack>
                </Card>
            </article>
        );
    };

    const articleText = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
        <article className={classNames(cls.ArticleListItem_list, {}, [className])}>
            <Card>
                <VStack gap={'16'} max>
                        
                    <HStack
                        ContainerTag={'header'}
                        justify={'between'}
                        max
                    >
                        <HStack gap={'8'}>
                            {   article.user.avatarUrl &&
                                <Avatar
                                    theme={AvatarTheme.ROUNDED}
                                    size={24} 
                                    src={article.user.avatarUrl}
                                    border={false}
                                />
                            }
                            <Text text={article.user.username}/>
                        </HStack>
                        <time dateTime={article.createdAt}>
                            {article.createdAt}
                        </time>
                    </HStack>
                        
                        
                    <VStack gap={'4'}>
                        <Text
                            title={article.title}
                            size={TextSize.M}
                        />
                        <Text
                            text={article.type.join(', ')}
                            size={TextSize.M}
                        />
                    </VStack>
                        
                    <VStack gap={'32'} max>
                        <img
                            className={cls.articleImage}
                            src={article.img}
                        />

                        <Text
                            className={cls.articleText}
                            text={(articleText).paragraphs[0] || ''}
                            size={TextSize.M}
                        />
                    </VStack>
                        
                    <HStack
                        ContainerTag={'footer'}
                        justify={'between'}
                        align={'center'}
                        max
                    >
                        <AppLink
                            theme={AppLinkTheme.OUTLINE}
                            to={articleDetailsPath} 
                            target={target} 
                            onClick={onOpenCb}
                        >
                            { t('read') }
                        </AppLink>
                        <HStack gap={'4'} align={"center"} >
                            <Text
                                text={String(article.views)}
                                size={TextSize.M}
                            />
                            <EyeIcon />
                        </HStack>
                    </HStack>
                        

                </VStack>
            </Card>
        </article>
    );
};
