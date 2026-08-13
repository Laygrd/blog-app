import { memo } from "react";
import { Card } from "shared/ui/Card/Card";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { ArticleListView } from "../../model/types/Article";
import cls from './ArticleListItem.module.scss';
import { HStack, VStack } from "shared/ui/Stack";


interface ArticleListItemSkeletonProps {
    view?: ArticleListView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const {
        view = ArticleListView.TILE,
    } = props;

    if ( view === ArticleListView.LIST ) {
        return(
            <Card>
                <VStack gap={'16'} max>

                    {/* header */}
                    <HStack justify={'between'} max >
                        <Skeleton width={80} height={24}/>
                        <Skeleton width={100} height={24}/>
                    </HStack>

                    {/* title && type */}
                    <VStack gap={'4'} max>
                        <Skeleton width={'50%'} height={32}/>
                        <Skeleton className={cls.type} width={100} height={24}/>
                    </VStack>

                    {/* image && text */}
                    <VStack gap={'32'} max>
                        <Skeleton width={'100%'} height={350}/>
                        <Skeleton width={'100%'} height={120}/>
                    </VStack>

                    {/* footer */}
                    <HStack justify={'between'} max>
                        <Skeleton width={70} height={24}/>
                        <Skeleton width={50} height={24}/>
                    </HStack>

                </VStack>
            </Card>
        );
    };

    return(
        <>
            <div>
                <Card>
                    <VStack max gap={'8'}>
                        {/* image */}
                        <Skeleton width={200} height={200}/>

                        {/* type && views */}
                        <HStack justify={'between'} max>
                            <Skeleton className={cls.type} width={80} height={24}/>
                            <Skeleton className={cls.views} width={50} height={24}/>
                        </HStack>
                        
                        {/* title */}
                        <Skeleton width={'100%'} height={24}/>
                    </VStack>
                </Card>
            </div>
        </>
    );
});

