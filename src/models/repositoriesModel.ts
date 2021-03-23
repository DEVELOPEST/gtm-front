import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../api";
import {IRepository, ITrackedRepository} from "../api/models/IRepository";

export interface RepositoriesModel {
    repositories: IRepository[];
    error: Error | null;
    loading: boolean;
    setRepositories: Action<RepositoriesModel, IRepository[]>
    setError: Action<RepositoriesModel, Error | null>
    setLoading: Action<RepositoriesModel, boolean>
    fetchRepositories: Thunk<RepositoriesModel>
    postRepository: Thunk<RepositoriesModel, string>
}

const repositories: RepositoriesModel = {
    repositories: [],
    error: null,
    loading: false,
    setRepositories: action((store, payload) => {
        store.repositories = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchRepositories: thunk(async (actions, _, { injections }) => {
        const api: IApi = injections.api;
        actions.setLoading(true)
        await api.fetchRepositories()
            .then(repositories => {
                actions.setRepositories(repositories);
            })
            .catch((err: Error) => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
    postRepository: thunk(async (actions, url, { injections }) => {

        const api: IApi = injections.api;
        let pushHookUrl: boolean | string = false
        actions.setLoading(true)
        await api.postRepository({'clone_url': url})
            .then(trackedRepository => {
                pushHookUrl = trackedRepository.syncUrl;
            })
            .catch((err: Error) => {
                actions.setError(err);
            })
        actions.setLoading(false)
        return pushHookUrl
    }),
};

export default repositories;
