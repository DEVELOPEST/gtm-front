import {Action, action, Thunk, thunk} from 'easy-peasy';
import setSessionToken from "../utils/setSessionToken";
import {IApi} from "../api";
import {IUser, IUserCredentials} from "../api/models/IUser";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface AuthModel {
    logins: string[],
    hasPassword: boolean | null,
    errors: [],
    error: AxiosError<IError> | null,
    loading: boolean,
    setHasPassword: Action<AuthModel, boolean | null>
    setLogins: Action<AuthModel, string[]>
    setErrors: Action<AuthModel, []>
    setError: Action<AuthModel, AxiosError<IError> | null>
    setLoading: Action<AuthModel, boolean>
    getPassword: Thunk<AuthModel>
    get_logins: Thunk<AuthModel>
    delete_login: Thunk<AuthModel, string>
    delete_account: Thunk<AuthModel>
    login: Thunk<AuthModel, IUserCredentials>
    register: Thunk<AuthModel, IUserCredentials>
    fetchToken: Thunk<AuthModel>
}

const auth: AuthModel = {
    logins: [],
    hasPassword: null,
    errors: [],
    error: null,
    loading: false,
    setHasPassword: action((store, payload) => {
        store.hasPassword = payload;
    }),
    setLogins: action((store, payload) => {
        store.logins = payload;
    }),
    setErrors: action((store, payload) => {
        store.errors = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    getPassword: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.getPassword()
            .then(data => {
                actions.setHasPassword(data);
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    get_logins: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.logins()
            .then(data => {
                actions.setLogins(data);
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    delete_login: thunk(async (actions, login_type, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.delete_login(login_type)
            .then(() => {
                actions.get_logins();
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    delete_account: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.delete_account()
            .then(() => {
                localStorage.removeItem('token')
                window.location.reload()
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    login: thunk(async (actions, userCredentials, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.login(userCredentials)
            .then(data => {
                setSessionToken(data.jwt)
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response)
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    register: thunk(async (actions, userCredentials, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.register(userCredentials)
            .then(data => {
                setSessionToken(data.jwt);
                window.location.reload()
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    fetchToken: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;

        await api.fetchToken()
            .then(data => {
                setSessionToken(data.jwt);
            })
            .catch(err => {
                actions.setError(err);
            })
    }),
};
export default auth;
