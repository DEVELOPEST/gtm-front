import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "./index";
import {cleanup} from "@testing-library/react";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("repositoriesModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.repositories.setLoading(false)
        expect(store.getState().repositories.loading).toEqual(false);

        store.dispatch.repositories.setLoading(true)
        expect(store.getState().repositories.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.repositories.setError(error)
        expect(store.getState().repositories.error).toEqual(error);

        store.dispatch.repositories.setError(null)
        expect(store.getState().repositories.error).toEqual(null);
    })

    test('repositories', async() => {
        const repos = [getData()]
        // @ts-ignore
        store.dispatch.repositories.setRepositories(repos)
        expect(store.getState().repositories.repositories).toEqual(repos);

        store.dispatch.repositories.setRepositories([])
        expect(store.getState().repositories.repositories).toEqual([]);
    })

    test('fetchRepositories success', async() => {
        const data = [getData()]

        const api = {
            fetchRepositories: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.repositories.fetchRepositories('test');

        expect(api.fetchRepositories).toHaveBeenCalled();
        expect(store.getState().repositories.repositories).toEqual(data);
    })

    test('fetchRepositories error', async() => {
        const api = {
            fetchRepositories: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.repositories.fetchRepositories("");

        expect(api.fetchRepositories).toHaveBeenCalled();
        expect(store.getState().repositories.error).toEqual(error);
    })

    test('postRepository success', async() => {

        const api = {
            postRepository: jest.fn(() => Promise.resolve({syncUrl: 'test'})),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        expect(await store.dispatch.repositories.postRepository('test')).toEqual('test');
        expect(api.postRepository).toHaveBeenCalled();
    })

    test('postRepository error', async() => {
        const api = {
            postRepository: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.repositories.postRepository("");

        expect(api.postRepository).toHaveBeenCalled();
        expect(store.getState().repositories.error).toEqual(error);
    })

    test('deleteRepository success', async() => {

        const api = {
            deleteRepository: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.repositories.deleteRepository(1);

        expect(api.deleteRepository).toHaveBeenCalled();
    })

    test('deleteRepository error', async() => {
        const api = {
            deleteRepository: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.repositories.deleteRepository(1);

        expect(api.deleteRepository).toHaveBeenCalled();
        expect(store.getState().repositories.error).toEqual(error);
    })
})

const getData = () => {
    return {
        id: 1,
        user: 'user',
        provider: 'provider',
        repository: 'repository',
        path: 'path',
        isApp: false,
        filesCount: 1,
        timestamp: 1,
        message: 'message',
        totalTime: 1,
        linesAdded: 1,
        linesRemoved: 1,
    }
}
