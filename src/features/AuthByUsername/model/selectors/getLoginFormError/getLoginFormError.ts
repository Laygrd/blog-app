import type { StateSchema } from "@/app/providers/StoreProvider";

export const getLoginFormError = (state: StateSchema) => state.loginForm?.error || undefined;
