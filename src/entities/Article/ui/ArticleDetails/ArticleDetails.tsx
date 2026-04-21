import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DynamicReducerLoader, ReducersList } from 'shared/lib/components/DynamicReducerLoader/DynamicReducerLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarTheme } from 'shared/ui/Avatar/Avatar';
import AvatarDefault from 'shared/assets/tests/avatar_default.jpg';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import EyeIcon from 'shared/assets/icons/eye-icon.svg';
import CalendarIcon from 'shared/assets/icons/calendar-icon.svg';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import {
    getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleBlock, ArticleBlockType } from '../../model/types/Article';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import cls from './ArticleDetails.module.scss';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RouterPaths } from 'shared/config/router/routerVars';


interface ArticleDetailsProps {
   className?: string;
   id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('article_details')
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock, index) => {
        switch (block.type) {
        case ArticleBlockType.TEXT: 
            return <ArticleTextBlockComponent key={index} className={cls.block} blockData={block}/>
        
        case ArticleBlockType.CODE: 
            return <ArticleCodeBlockComponent key={index} className={cls.block} blockData={block}/>
        
        case ArticleBlockType.IMAGE: 
            return <ArticleImageBlockComponent key={index} className={cls.block} blockData={block}/>
        }
    }, []);

    useInitialEffect( () => {
        dispatch(fetchArticleById(id));
    })


    let content;

    if (isLoading) {
        content = ( <ArticleDetailsSkeleton />)
    } else if (error) {
        content = (
            <div
                className={cls.errorMessage}
            >{t('errors.FAILED_TO_FETCH_ARTICLE')}</div>
        )
    } else {
        content = (
            <>
                <div className={cls.avatarWrapper}>
                    <Avatar
                        size={200}
                        theme={AvatarTheme.ROUNDED}
                        src={data?.img}
                    />
                </div>

                <div className={cls.header}>
                    <AppLink
                        className={cls.user}
                        to={`${RouterPaths.profiles}${data?.user.id}`}
                    >
                        <Avatar
                            size={24}
                            border={false}
                            theme={AvatarTheme.ROUNDED}
                            src={data?.user.avatarUrl}
                        />
                        <Text text={data?.user.username}/>
                    </AppLink>

                    <div className={cls.info}>
                        <EyeIcon className={cls.icon}/>
                        <Text text={String(data?.views)}/>
                    </div>

                    <div className={cls.info}>
                        <CalendarIcon className={cls.icon}/>
                        <Text text={String(data?.createdAt)}/>
                    </div>
                </div>

                <Text
                    className={cls.title}
                    title={data?.title}
                    text={data?.subtitle}
                    size={TextSize.L}
                />
                <div className={cls.subtitle}/>  
                {
                    data?.blocks.map(renderBlock)
                }
            </>
        )
    }

    return (
        <DynamicReducerLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicReducerLoader>
    );
});
