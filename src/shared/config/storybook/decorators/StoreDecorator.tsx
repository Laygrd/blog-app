import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { profileReducer } from "entities/Profile";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { ReducersList } from "../../../lib/components/DynamicReducerLoader/DynamicReducerLoader";
import { articleDetailsReducer } from "entities/Article/model/slice/articleDetailsSlice";
import { addCommentFormReducer } from "features/addCommentForm/model/slice/addCommentFormSlice";
import { articlesPageReducer } from "pages/ArticlesPage/model/slice/articlesPageSlice";
import { articleDetailsPageReducer } from "pages/ArticleDetailsPage";


const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDetailsPage: articleDetailsPageReducer,
    addCommentForm: addCommentFormReducer,
    articlesPage: articlesPageReducer

}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList
) => (StoryComponent: Story) => {
    return (
        <StoreProvider initialState={state} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
            <StoryComponent />
        </StoreProvider>
    )
};
