import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RouterPaths } from 'shared/config/router/routerVars';
import { getCanEditArticle } from '../../model/selectors/article/getCanEditArticle/getCanEditArticle';
import cls from './ArticleDetailsPageHeader.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getArticleDetailsData } from 'entities/Article';


interface ArticleDetailsPageHeaderProps {
   className?: string;
}

export const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article_details')

    const canEdit = useSelector(getCanEditArticle);
    const article = useSelector(getArticleDetailsData);

    return (
        <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
            <AppLink
                className={cls.backLink}
                to={RouterPaths.articles}
            >   
                <Button
                    className={cls.editBtn}
                    theme={ButtonTheme.OUTLINE}
                >
                    {t('backLink')}
                </Button>
            </AppLink>
            { canEdit &&
                <AppLink
                    className={cls.editLink}
                    to={`${RouterPaths.articles}/${article?.id}/edit`}
                >
                    <Button
                        theme={ButtonTheme.OUTLINE}
                    >
                        {t('editBtn')}
                    </Button>
                </AppLink>
            }
        </div>
    );
}
