import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Avatar, AvatarTheme } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
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
import { Button, ButtonTheme } from 'shared/ui/Button/Button';


interface ArticleListItemProps {
   className?: string;
   article?: Article;
   view?: ArticleListView;
   isLoading?: boolean;
   target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleListView.LIST,
        isLoading = false,
        target,
    } = props;
    const { t } = useTranslation('article');

    if (isLoading) {
        return (
            <div className={classNames(cls[view], {}, [className])}>
                <ArticleListItemSkeleton view={view}/>
            </div>
        )
    };

    // reusable staff

    if (!article) {
        return (
            <div className={classNames(cls[view], {}, [className])}>
                {t('errors.ARTICLE_NOT_FOUND')}
            </div>
        )
    }

    const articleDetailsPath = `${RouterPaths.article_details}${article.id}`;

    const viewsBlock = (
        <div className={cls.views}>
            {article.views}
            <EyeIcon />
        </div>
    );

    const typeBlock = (
        <Text
            className={cls.type}
            text={article.type.join(', ')}
        />
    );


    if (view == ArticleListView.LIST) {
        const articleText = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <div className={cls.user}>
                            {   article.user.avatarUrl &&
                                <Avatar
                                    theme={AvatarTheme.ROUNDED}
                                    size={24} 
                                    src={article.user.avatarUrl}
                                    border={false}
                                />
                            }
                            <Text text={article.user.username}/>
                        </div>
                        <div className={cls.created}>
                            {article.createdAt}
                        </div>
                    </div>
                    <Text
                        className={cls.title}
                        title={article.title}
                    />
                    {typeBlock}
                    <img
                        className={cls.articleImage}
                        src={article.img}
                    />
                    <Text
                        className={cls.articleText}
                        text={(articleText).paragraphs[0] || ''}
                    />
                    <div className={cls.footer}>
                        <AppLink
                            to={articleDetailsPath}
                            target={target}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t('read')}
                            </Button>
                        </AppLink>
                        {viewsBlock}
                    </div>
                </Card>
            </div>
        );
    }
    // 
    return (
        <AppLink
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            to={articleDetailsPath}
            target={target}
        >
            <Card>
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
                <div className={cls.info}>
                    {typeBlock}
                    {viewsBlock}
                </div>
                <Text
                    className={cls.title}
                    text={article.title}
                />
            </Card>
        </AppLink>
    )
})