import { StateSchema } from "app/providers/StoreProvider";

export const getUIScroll = (state: StateSchema) => state.ui?.scroll;