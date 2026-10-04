export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export type { ArticleDetailsPageSchema } from './model/types/ArticleDetailsPageSchema';
export type { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
export type { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
export { articleDetailsPageReducer } from './model/slice';