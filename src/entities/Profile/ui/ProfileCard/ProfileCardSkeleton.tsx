import { Skeleton } from "shared/ui/Skeleton/Skeleton"
import { HStack, VStack } from "shared/ui/Stack";


export const ProfileCardSkeleton = () => {
    return (
        <>
            <Skeleton
                height={200}
                width={200}
                border={'50%'}
            />
            <HStack gap={'32'} align={'start'}>
                <VStack gap={'16'}>
                    <Skeleton height={24} width={180}/>
                    <Skeleton height={45} width={'100%'} />
                    <Skeleton height={45} width={'100%'} />
                    <Skeleton height={45} width={'100%'} />
                    <Skeleton height={45} width={'100%'} />
                </VStack>
                <VStack gap={'16'}>
                    <Skeleton height={24} width={180} />
                    <Skeleton height={45} width={'100%'} />
                    <Skeleton height={45} width={'100%'} />
                    <Skeleton height={45} width={'100%'} />
                </VStack>
            </HStack>
        </>
    )
}