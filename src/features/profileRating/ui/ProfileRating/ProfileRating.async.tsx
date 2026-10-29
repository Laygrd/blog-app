import { lazy, Suspense } from "react";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import type { ProfileRatingProps } from "./ProfileRating";


const ProfileRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width={'400px'} height={'120px'} border={'8px'} />}>
            <ProfileRatingLazy {...props}/>
        </Suspense>
    )
};
