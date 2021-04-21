import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../api";
import {IRepository, ITrackedRepository} from "../api/models/IRepository";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface RepositoriesModel {
    repositories: IRepository[];
    error: AxiosError<IError> | null;
    loading: boolean;
    setRepositories: Action<RepositoriesModel, IRepository[]>
    setError: Action<RepositoriesModel, AxiosError<IError> | null>
    setLoading: Action<RepositoriesModel, boolean>
    fetchRepositories: Thunk<RepositoriesModel, string>
    deleteRepository: Thunk<RepositoriesModel, number>
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
    fetchRepositories: thunk(async (actions, searchable, { injections }) => {
        const api: IApi = injections.api;
        actions.setLoading(true)
        await api.fetchRepositories(searchable)
            .then(repositories => {
                actions.setRepositories(repositories);
            })
            .catch((err: AxiosError<IError>) => {
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
            .catch((err: AxiosError<IError>) => {
                actions.setError(err);
            })
        actions.setLoading(false)
        return pushHookUrl
    }),
    deleteRepository: thunk(async (actions, id, { injections }) => {
        const api: IApi = injections.api;
        actions.setLoading(true)
        await api.deleteRepository(id)
            .then(() => {
                actions.fetchRepositories('')
            })
            .catch((err: AxiosError<IError>) => {
                actions.setError(err);
            })
        actions.setLoading(false)
    }),
};

export default repositories;
