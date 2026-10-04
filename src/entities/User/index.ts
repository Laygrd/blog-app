export {
    userReducer,
    userActions
} from './model/slice/userSlice';

export {
    getUserAuthData,
} from './model/selectors/getUserAuthData/getUserAuthData';

export {
    getUserInited,
} from './model/selectors/getUserInited/getUserInited';

export {
    getUserRoles,
    getUserIsAdmin,
    getUserIsManager,
} from './model/selectors/roleSelectors/roleSelectors';

export type  {
    User,
    UserSchema,
} from './model/types/UserSchema';

export { UserRole } from './model/consts/consts';
