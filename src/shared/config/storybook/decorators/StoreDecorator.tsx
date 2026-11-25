import { Story } from "@storybook/react";
import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";


import { loginReducer } from "@/features/AuthByUsername/testing";
import { articlesPageReducer } from "@/pages/ArticlesPage/testing";
import { articleDetailsReducer } from "@/entities/Article/testing";
import { profileReducer } from "@/features/editableProfileCard/testing";
import { addCommentFormReducer } from "@/features/addCommentForm/testing";
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/testing";

import { ReducersList } from "../../../lib/components/DynamicReducerLoader/DynamicReducerLoader";


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
