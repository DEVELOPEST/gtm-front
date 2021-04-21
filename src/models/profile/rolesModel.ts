import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../../api";
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";

export interface RolesModel {
    error: AxiosError<IError> | null;
    loading: boolean;
    setError: Action<RolesModel, AxiosError<IError> | null>;
    setLoading: Action<RolesModel, boolean>;
    addRole: Thunk<RolesModel, number>;
    removeRole: Thunk<RolesModel, number>;
}


const roles: RolesModel = {
    error: null,
    loading: false,
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    addRole: thunk(async (actions, userId, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.addRole({"user": userId, role: 2})
            .then(() => {})
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    removeRole: thunk(async (actions, userId, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.removeRole({"user": userId, role: 2})
            .then(() => {})
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default roles;
