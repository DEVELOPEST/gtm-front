import {action, thunk} from 'easy-peasy';
import setSessionToken from "../utils/setSessionToken";

const authModel = {
    logins: [],
    errors: [],
    loading: false,
    setLogins: action((store, payload) => {
        store.logins = payload;
    }),
    setErrors: action((store, payload) => {
        store.errors = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    get_logins: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.logins()
            .then(data => {
                actions.setLogins(data);
            })
            .catch(err => {
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    delete_login: thunk(async (actions, login_type, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.delete_login({"login_type": login_type})
            .then(() => {
                actions.get_logins();
            })
            .catch(err => {
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    login: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.login(payload)
            .then(data => {
                setSessionToken(data.jwt)
                window.location.reload()
            })
            .catch(err => {
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    register: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.register(payload)
            .then(data => {
                setSessionToken(data);
                window.location.reload()
            })
            .catch(err => {
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    fetchToken: thunk(async (actions, _payload, { injections }) => {
        const { api } = injections;

        await api.fetchToken()
            .then(data => {
                setSessionToken(data);
            })
            .catch(err => {
                actions.setErrors(err);
            })
    }),
};
export default authModel;
