import { StateSchema } from "app/providers/StoreProvider";

export const getProfileDataUsername = (state: StateSchema) => state.profile?.data?.username;