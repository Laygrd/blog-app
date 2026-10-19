import type { StateSchema } from "@/app/providers/StoreProvider";

export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
