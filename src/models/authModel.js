import {action, computed, thunk} from 'easy-peasy';
import setAuthHeader from "../utils/setAuthHeader";

const authModel = {
    errors: [],
    loading: false,
    setPasswordRepeat: action((store, payload) => {
        store.passwordRepeat = payload;
    }),
    setErrors: action((store, payload) => {
        store.errors = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    login: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.login(payload)
            .then(data => {
                console.log(data)
                setAuthHeader(data.jwt);
                localStorage.setItem('token', data.jwt)
            })
            .catch(err => {
                console.log(err)
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    register: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.register(payload)
            .then(data => {
                console.log(data)
                setAuthHeader(data);
                localStorage.setItem('token', data)
            })
            .catch(err => {
                console.log(err)
                actions.setErrors(err);
            })
        actions.setLoading(false)
    }),
    fetchToken: thunk(async (actions, _payload, { injections }) => {
        const { api } = injections;

        await api.fetchToken()
            .then(data => {
                console.log(data)
                setAuthHeader(data);
                localStorage.setItem('token', data)
            })
            .catch(err => {
                console.log(err)
                actions.setErrors(err);
            })
    }),
};

export default authModel;
