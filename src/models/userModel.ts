import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IUser} from "../api/models/IUser";
import {IApi} from "../api";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface UserModel {
    user: IUser | null;
    error: AxiosError<IError> | null;
    loading: boolean;
    setUser: Action<UserModel, IUser | null>;
    setError: Action<UserModel, AxiosError<IError> | null>;
    setLoading: Action<UserModel, boolean>;
    fetchUser: Thunk<UserModel, number>;
}

const user: UserModel = {
    user: null,
    error: null,
    loading: false,
    setUser: action((store, payload) => {
        store.user = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchUser: thunk(async (actions, userId, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.getUser(userId)
            .then(user => {
                actions.setUser(user)
            })
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default user;
