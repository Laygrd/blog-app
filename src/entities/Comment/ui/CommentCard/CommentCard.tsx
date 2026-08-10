import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar, AvatarTheme } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { HStack, VStack } from 'shared/ui/Stack';
import { RouterPaths } from 'shared/config/router/routerVars';
import { CommentCardSkeleton } from './CommentCardSkeleton';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';


interface CommentCardProps {
   className?: string;
   comment?: Comment;
   isLoading?: boolean;
}

export const CommentCard = (props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading = false,
    } = props;

    if (isLoading) {
        return ( <CommentCardSkeleton /> )
    }

    return (
        <VStack className={classNames(cls.CommentCard, {}, [className])} max >

            <AppLink to={`${RouterPaths.profiles}${comment?.user.id}`} >

                <HStack gap={'4'}>
                    <Avatar
                        src={comment?.user.avatarUrl || '' }
                        size={30}
                        theme={AvatarTheme.ROUNDED}
                        border={false}
                    />
                    <Text
                        title={comment?.user.username}
                    />
                </HStack>

            </AppLink>

            <Text
                className={cls.commentText}
                text={comment?.text}
            />
        </VStack>
    );
}
