import {action, thunk} from 'easy-peasy';

const sidebarModel = {
    groups: [],
    chosenGroup: '',
    error: '',
    loading: false,
    setGroups: action((store, payload) => {
        store.groups = payload;
    }),
    setChosenGroup: action((store, payload) => {
        store.chosenGroup = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchGroups: thunk(async (actions, _payload, { injections, getStoreState }) => {
        const { api } = injections;
        const { chosenGroup } = getStoreState().groups;

        actions.setLoading(true)
        await api.getGroups()
            .then(data => {
                actions.setGroups(data.groups)
                if (data.groups.length > 0 && chosenGroup === '') {
                    actions.setChosenGroup(data.groups[0])
                }
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default sidebarModel;
