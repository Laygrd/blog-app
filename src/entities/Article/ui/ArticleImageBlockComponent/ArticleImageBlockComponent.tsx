import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import type { ArticleImageBlock } from '../../model/types/Article';
import cls from './ArticleImageBlockComponent.module.scss';


interface ArticleImageBlockComponentProps {
   className?: string;
   blockData: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, blockData } = props;
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img
                className={cls.image}
                src={blockData.src}
                alt={blockData.title} 
            />
            {blockData.title && 
                <Text
                    text={blockData.title}
                    align={TextAlign.CENTER}
                />
            }
        </div>
    );
});
ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent';
