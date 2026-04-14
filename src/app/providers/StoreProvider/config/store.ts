import { configureStore, ReducersMapObject } from "@reduxjs/toolkit";
import { CombinedState, Reducer } from 'redux';
import { StateSchema } from "./StateSchema";
import { uiReducer } from "features/UI";
import { counterReducer } from "entities/Counter";
import { userReducer } from "entities/User";
import { $api } from "shared/api/api";
import { createReducerManager } from "./reducerManager";
import { NavigateOptions } from "react-router";
import { To } from 'history';


export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        ui: uiReducer
    };

    const reducerManager = createReducerManager(rootReducers)
    
    const store =  configureStore({

        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        preloadedState: initialState,
        devTools: __IS_DEV__,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api,
                    navigate: navigate
                }
            }
        })
    });

    // @ts-ignore
    store.reducerManager = reducerManager;
    return store;
};


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];