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
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RouterPaths } from 'shared/config/router/routerVars';

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
import { HStack, VStack } from 'shared/ui/Stack';


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
            <VStack align={'center'} justify={'center'} max>
                {t('errors.FAILED_TO_FETCH_ARTICLE')}
            </VStack>
        )
    } else {
        content = (
            <>
                <HStack justify={'center'} max>
                    <Avatar
                        size={200}
                        theme={AvatarTheme.ROUNDED}
                        src={data?.img}
                    />
                </HStack>

                <VStack gap={'32'} max>

                    <VStack gap={'4'}>
                        <AppLink to={`${RouterPaths.profiles}${data?.user.id}`} >
                            <HStack>
                                <Avatar
                                    size={24}
                                    border={false}
                                    theme={AvatarTheme.ROUNDED}
                                    src={data?.user.avatarUrl}
                                />
                                <Text text={data?.user.username}/>
                            </HStack>
                        </AppLink>

                        <HStack >
                            <EyeIcon />
                            <Text text={String(data?.views)}/>
                        </HStack>

                        <HStack >
                            <CalendarIcon />
                            <Text text={String(data?.createdAt)}/>
                        </HStack>
                    </VStack>

                    <Text
                        title={data?.title}
                        text={data?.subtitle}
                        size={TextSize.L}
                    />

                    <VStack gap={'16'} max>
                        {
                            data?.blocks.map(renderBlock)
                        }
                    </VStack>

                </VStack>
                
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

ArticleDetails.displayName = 'ArticleDetails';
