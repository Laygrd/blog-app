import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import cls from './ArticleDetails.module.scss';


export const ArticleDetailsSkeleton = () => {
    return (
        <>
            <Skeleton className={cls.avatar} width={200} height={200} border={'50%'}/>
            <Skeleton className={cls.header} width={'30%'} height={24} />
            <Skeleton className={cls.title} width={'50%'} height={35} />
            <Skeleton className={cls.subtitle} width={'40%'} height={27} />
            <Skeleton className={cls.block} width={'100%'} height={200} />
            <Skeleton className={cls.block} width={'100%'} height={200} />
            <Skeleton className={cls.block} width={'100%'} height={200} />
        </>
    );
}