import {action, thunk, useStoreActions} from 'easy-peasy';

const rolesModel = {
    error: '',
    loading: false,
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    addRole: thunk(async (actions, userId, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.addRole({"user": userId, role: 2})
            .then(() => {})
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    removeRole: thunk(async (actions, userId, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.removeRole({"user": userId, role: 2})
            .then(() => {})
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default rolesModel;
