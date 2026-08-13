import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/Article';
import cls from './ArticleTextBlockComponent.module.scss';


interface ArticleTextBlockComponentProps {
   className?: string;
   blockData: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, blockData } = props;
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.articleTextBlockComponent, {}, [className])}>
            <Text title={blockData.title}/>
            {blockData.paragraphs.map((paragraph, index) => (
                <Text key={index} text={paragraph} size={TextSize.M}/>
            ))}
        </div>
    );
})
