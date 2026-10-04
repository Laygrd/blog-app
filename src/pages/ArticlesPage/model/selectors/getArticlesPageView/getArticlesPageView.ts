import type { StateSchema } from "app/providers/StoreProvider";
import { ArticleListView } from "entities/Article";

export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleListView.LIST;
