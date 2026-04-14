import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { getUIScroll } from '../getUIScroll/getUIScroll';

export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] ?? 0
)