import type { StateSchema } from "app/providers/StoreProvider";

export const getAddCommentFormError = (state: StateSchema) => state.addCommentForm?.error;
