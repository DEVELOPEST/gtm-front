import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("groupAccessModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.groupAccess.setLoading(false)
        expect(store.getState().groupAccess.loading).toEqual(false);

        store.dispatch.groupAccess.setLoading(true)
        expect(store.getState().groupAccess.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.groupAccess.setError(error)
        expect(store.getState().groupAccess.error).toEqual(error);

        store.dispatch.groupAccess.setError(null)
        expect(store.getState().groupAccess.error).toEqual(null);
    })

    test('accessibleGroups', async() => {
        const data = [getData()]
        store.dispatch.groupAccess.setAccessibleGroups(data)
        expect(store.getState().groupAccess.accessibleGroups).toEqual(data);

        store.dispatch.groupAccess.setAccessibleGroups([])
        expect(store.getState().groupAccess.accessibleGroups).toEqual([]);
    })

    test('notAccessibleGroups', async() => {
        const data = [getData()]
        store.dispatch.groupAccess.setNotAccessibleGroups(data)
        expect(store.getState().groupAccess.notAccessibleGroups).toEqual(data);

        store.dispatch.groupAccess.setNotAccessibleGroups([])
        expect(store.getState().groupAccess.notAccessibleGroups).toEqual([]);
    })

    test('fetchUserAccessibleGroups success', async() => {
        const data = [getData()]
        const api = {
            fetchUserAccessibleGroups: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.fetchUserAccessibleGroups(1);

        expect(api.fetchUserAccessibleGroups).toHaveBeenCalled();
        expect(store.getState().groupAccess.accessibleGroups).toEqual(data);
    })

    test('fetchUserAccessibleGroups error', async() => {
        const api = {
            fetchUserAccessibleGroups: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.fetchUserAccessibleGroups(1);

        expect(api.fetchUserAccessibleGroups).toHaveBeenCalled();
        expect(store.getState().groupAccess.error).toEqual(error);
    })

    test('removeRights success', async() => {
        const api = {
            removeRights: jest.fn(() => Promise.resolve()),
            fetchUserNotAccessibleGroups: jest.fn(() => Promise.resolve()),
            fetchUserAccessibleGroups: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.removeRights([getUserGroupData()]);

        expect(api.removeRights).toHaveBeenCalled();
    })

    test('removeRights error', async() => {
        const api = {
            removeRights: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.removeRights([getUserGroupData()]);

        expect(api.removeRights).toHaveBeenCalled();
        expect(store.getState().groupAccess.error).toEqual(error);
    })

    test('addRights success', async() => {
        const api = {
            addRights: jest.fn(() => Promise.resolve()),
            fetchUserNotAccessibleGroups: jest.fn(() => Promise.resolve()),
            fetchUserAccessibleGroups: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.addRights([getUserGroupData()]);

        expect(api.addRights).toHaveBeenCalled();
    })

    test('addRights error', async() => {
        const api = {
            addRights: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.addRights([getUserGroupData()]);

        expect(api.addRights).toHaveBeenCalled();
        expect(store.getState().groupAccess.error).toEqual(error);
    })

    test('toggleRecursiveRights success', async() => {
        const api = {
            toggleRecursiveRights: jest.fn(() => Promise.resolve()),
            fetchUserNotAccessibleGroups: jest.fn(() => Promise.resolve()),
            fetchUserAccessibleGroups: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.toggleRecursiveRights(getUserGroupData());

        expect(api.toggleRecursiveRights).toHaveBeenCalled();
    })

    test('toggleRecursiveRights error', async() => {
        const api = {
            toggleRecursiveRights: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.groupAccess.toggleRecursiveRights(getUserGroupData());

        expect(api.toggleRecursiveRights).toHaveBeenCalled();
        expect(store.getState().groupAccess.error).toEqual(error);
    })

})

const getData = () => {
    return {
        id: 1,
        name: 'name',
        addedAt: 'addedAt',
        groupAccess: null
    }
}

const getUserGroupData = () => {
    return {
        user: 1,
        group: 1,
        access_level_recursive: null
    }
}
