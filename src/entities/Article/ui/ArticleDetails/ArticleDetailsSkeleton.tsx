import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { HStack, VStack } from "shared/ui/Stack";


export const ArticleDetailsSkeleton = () => {
    return (
        <>  
            <HStack justify={'center'} max>
                <Skeleton width={200} height={200} border={'50%'}/>
            </HStack>

            <VStack gap={'32'} max>
                <VStack gap={'4'} justify={'start'} max>
                    <Skeleton width={'20%'} height={24} />
                    <Skeleton width={'20%'} height={24} />
                    <Skeleton width={'20%'} height={24} />
                </VStack>

                <Skeleton width={'50%'} height={72} />

                <VStack gap={'16'} max>
                    <Skeleton width={'100%'} height={150} />
                    <Skeleton width={'100%'} height={150} />
                    <Skeleton width={'100%'} height={150} />
                </VStack>
            </VStack>
            
        </>
    );
}