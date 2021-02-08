import {action, thunk} from 'easy-peasy';

const groupAccessModel = {
    accessibleGroups: [],
    notAccessibleGroups: [],
    error: '',
    loading: false,
    setAccessibleGroups: action((store, payload) => {
        store.accessibleGroups = payload;
    }),
    setNotAccessibleGroups: action((store, payload) => {
        store.notAccessibleGroups = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchUserAccessibleGroups: thunk(async (actions, userId, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.fetchUserAccessibleGroups(userId)
            .then(data => {
                actions.setAccessibleGroups(data.groups);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchUserNotAccessibleGroups: thunk(async (actions, userId, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.fetchUserNotAccessibleGroups(userId)
            .then(data => {
                actions.setNotAccessibleGroups(data.groups);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    removeRights: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.removeRights(payload)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(payload[0].user)
                actions.fetchUserAccessibleGroups(payload[0].user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    addRights: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.addRights(payload)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(payload[0].user)
                actions.fetchUserAccessibleGroups(payload[0].user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    toggleRecursiveRights: thunk(async (actions, payload, { injections }) => {
        const { api } = injections;

        actions.setLoading(true)
        await api.toggleRecursiveRights(payload)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(payload.user)
                actions.fetchUserAccessibleGroups(payload.user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default groupAccessModel;
