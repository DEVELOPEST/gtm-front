import { action, thunk } from 'easy-peasy';
import {useState} from "react";

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
    postRepository: thunk(async (actions, url, { injections, getStoreState }) => {

        const { api } = injections;
        let pushHookUrl = false
        actions.setLoading(true)
        await api.postRepository({'clone_url': url})
            .then(data => {
                pushHookUrl = data.sync_url;
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false)
        return pushHookUrl
    }),
};

export default RepositoriesModel;
