import { StateSchema } from "app/providers/StoreProvider";

export const getArticlesPageNumber = (state: StateSchema) => state.articlesPage?.page || 1;
