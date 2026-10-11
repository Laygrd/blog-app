import { rtkApi } from "shared/api/rtkApi";
import type { Notification } from '../model/types/notification';


const notificationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
                params: { }
            }),
        }),
    })
})

export const useNotifications = notificationsApi.useGetNotificationsQuery;
