import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';


interface CommentsListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = (props: CommentsListProps) => {
    const {
        className,
        comments,
        isLoading=false, 
    } = props;

    const { t } = useTranslation('article_details');

    if (isLoading) {
        return (
            <VStack 
                className={classNames('', {}, [className])}
                gap={'16'}
                max
            >
                <CommentCard key={'1'} isLoading />
                <CommentCard key={'2'} isLoading />
                <CommentCard key={'3'} isLoading />
            </VStack>
        )
    }

    return (
        <VStack
            className={classNames('', {}, [className])}
            max
            gap={'16'}
        >
            {comments?.length 
                ? comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} isLoading={isLoading} />
                ))
                : t('emptyCommentList')
            }
        </VStack>
    );
}
