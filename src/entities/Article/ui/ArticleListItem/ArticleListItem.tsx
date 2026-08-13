import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Avatar, AvatarTheme } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { HStack, VStack } from 'shared/ui/Stack';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { RouterPaths } from 'shared/config/router/routerVars';
import {
    Article,
    ArticleBlockType,
    ArticleListView,
    ArticleTextBlock,
} from '../../model/types/Article';
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton';
import cls from './ArticleListItem.module.scss';


interface ArticleListItemProps {
    className?: string;
    article?: Article;
    view?: ArticleListView;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    onOpenCb?: () => void;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleListView.LIST,
        isLoading = false,
        target,
        onOpenCb
    } = props;
    const { t } = useTranslation('article');

    if (isLoading) {
        return (
            <article className={classNames(cls[view], {}, [className])}>
                <ArticleListItemSkeleton view={view}/>
            </article>
        )
    };

    if (!article) {
        return (
            <article className={classNames(cls[view], {}, [className])}>
                <Text 
                    theme={TextTheme.ERROR}
                    text={t('errors.ARTICLE_NOT_FOUND')}
                    size={TextSize.M}
                />
            </article>
        )
    }

    const articleDetailsPath = `${RouterPaths.article_details}${article.id}`;


    if (view == ArticleListView.LIST) {
        const articleText = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <article className={classNames(cls[view], {}, [className])}>
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
    }
    // 
    return (
        <AppLink
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
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
})