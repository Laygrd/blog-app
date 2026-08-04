import { StateSchema } from "app/providers/StoreProvider";

export const getArticlesPageLastVisitedIndex = (state: StateSchema) => state.articlesPage?.lastVisitedIndex;
