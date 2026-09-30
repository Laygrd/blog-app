import { Reducer } from "@reduxjs/toolkit";
import { ReactNode, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";


export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicReducerLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

// for async reducer loading
export const DynamicReducerLoader = (props: DynamicReducerLoaderProps) =>{
    const {
        children,
        reducers,
        removeAfterUnmount,
    } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();
    const mountedReducers = store.reducerManager.getReducerMap();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];

            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({type: `@INIT ${name} reducer`});
            } 
            // else {
            //     console.log(`already mounted ${name} reducer found. skip mounting`)
            // }
        })
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({type: `@DESTROY ${name} reducer`})
                })
            };
        };
    // eslint-disable-next-line
    }, [])

    return(
        <>
            { children }
        </>
    );
};
