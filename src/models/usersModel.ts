import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IUser} from "../api/models/IUser";
import {IApi} from "../api";

export interface UsersModel {
    users: IUser[];
    error: Error | null;
    loading: boolean;
    setUsers: Action<UsersModel, IUser[]>;
    setError: Action<UsersModel, Error | null>;
    setLoading: Action<UsersModel, boolean>;
    fetchUsers: Thunk<UsersModel, string>;
}

const users: UsersModel = {
    users: [],
    error: null,
    loading: false,
    setUsers: action((store, payload) => {
        store.users = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchUsers: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.getUsers()
            .then(users => {
                actions.setUsers(users)
            })
            .catch((err: Error) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default users;
