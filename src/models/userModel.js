import { action, thunk } from 'easy-peasy';

const userModel = {
    user: {},
    error: '',
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
    fetchUser: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.getUser(payload)
            .then(data => {
                actions.setUser(data.user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default userModel;
