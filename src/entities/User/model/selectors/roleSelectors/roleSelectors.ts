import { createSelector } from "@reduxjs/toolkit";
import type { StateSchema } from "app/providers/StoreProvider";
import { UserRole } from "../../consts/consts";


export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getUserIsAdmin = createSelector(getUserRoles, (roles) => {
    return roles?.includes(UserRole.ADMIN)
});

export const getUserIsManager = createSelector(getUserRoles, (roles) => {
    return roles?.includes(UserRole.MANAGER)
});