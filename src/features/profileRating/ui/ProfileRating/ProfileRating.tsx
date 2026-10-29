import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useGetProfileRating, useRateProfile } from '../../api/profileRatingApi';


export interface ProfileRatingProps {
   className?: string;
   profileId: string;
};

const ProfileRating = (props: ProfileRatingProps) => {
    const {
        className,
        profileId,
    } = props;

    const { t } = useTranslation('profilePage');
    const user = useSelector(getUserAuthData);
    const { data, isLoading } = useGetProfileRating({ userId: user?.id ?? '', profileId});
    const [ rateProfileMutation ] = useRateProfile();

    const rating = data?.[0];

    const rateProfileHandler = useCallback((starsCount: number, feedback?: string) => {
        rateProfileMutation({
            userId: user?.id ?? '',
            profileId,
            rate: starsCount,
            feedback
        })
    }, [rateProfileMutation, user?.id, profileId]);

    const onAcceptHandler = useCallback((starCount: number, feedback?: string) => {
        rateProfileHandler(starCount, feedback);
    }, [rateProfileHandler]);

    const onCancelHandler = useCallback((starRating: number) => {
        rateProfileHandler(starRating);
    }, [rateProfileHandler]);

    if (profileId == user?.id) {
        return null;
    };

    if (isLoading) {
        return <Skeleton width={'400px'} height={'120px'} border={'8px'} />
    };

    return (
        <RatingCard 
            className={className}
            title={t('ProfileRating.title')}
            hasFeedback
            feedbackTitle={t('ProfileRating.feedbackTitle')}
            onAccept={onAcceptHandler}
            onCancel={onCancelHandler}
            rate={rating?.rate}
        />
    );
};

export default ProfileRating;