import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleEditPage.module.scss';
import { Page } from 'widgets/Page';


interface ArticleEditPageProps {
   className?: string;
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article_edit');
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);


    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            { isEdit ? t('editArticle') + id: t('newArticle') }
        </Page>
    );
}
export default ArticleEditPage;