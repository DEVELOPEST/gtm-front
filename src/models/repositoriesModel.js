import { action, thunk } from 'easy-peasy';

const RepositoriesModel = {
    repositories: [],
    error: '',
    loading: false,
    setData: action((store, payload) => {
        store.repositories = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchRepositories: thunk(async (actions, payload, { injections, getStoreState }) => {
        const { api } = injections;
        actions.setLoading(true)
        await api.fetchRepositories()
            .then(data => {
                console.log(data)
                actions.setData(data);
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
};

export default RepositoriesModel;
