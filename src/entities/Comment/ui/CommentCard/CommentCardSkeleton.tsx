import { classNames } from "shared/lib/classNames/classNames"
import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import cls from './CommentCard.module.scss';
import { HStack, VStack } from "shared/ui/Stack";


export const CommentCardSkeleton = () => {
    return (
        <VStack className={classNames(cls.CommentCard, {}, [cls.loading])} max>
            <HStack gap={'4'} max>
                <Skeleton
                    border={'50%'}
                    width={30}
                    height={30}
                />
                <Skeleton width={'45%'} height={20}/>
            </HStack>
            <Skeleton
                className={cls.commentText}
                width={'95%'}
                height={24}
            />
        </VStack>
    )
}