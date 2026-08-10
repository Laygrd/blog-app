import { memo } from 'react';
import { Code } from 'widgets/Code/Code';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleCodeBlock } from '../../model/types/Article';
import cls from './ArticleCodeBlockComponent.module.scss';


interface ArticleCodeBlockComponentProps {
   className?: string;
   blockData: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
    const { className, blockData } = props;

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={blockData.code}/>
        </div>
    );
});
