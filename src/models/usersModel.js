import { action, thunk } from 'easy-peasy';

const usersModel = {
    users: [],
    error: '',
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
    fetchUsers: thunk(async (actions, interval, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.getUsers()
            .then(data => {
                actions.setUsers(data.users)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default usersModel;
