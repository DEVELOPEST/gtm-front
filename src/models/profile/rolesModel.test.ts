import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("rolesModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.roles.setLoading(false)
        expect(store.getState().roles.loading).toEqual(false);

        store.dispatch.roles.setLoading(true)
        expect(store.getState().roles.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.roles.setError(error)
        expect(store.getState().roles.error).toEqual(error);

        store.dispatch.roles.setError(null)
        expect(store.getState().roles.error).toEqual(null);
    })

    test('addRole success', async() => {
        const api = {
            addRole: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.roles.addRole(2);

        expect(api.addRole).toHaveBeenCalled();
    })

    test('addRole error', async() => {
        const api = {
            addRole: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.roles.addRole(2);

        expect(api.addRole).toHaveBeenCalled();
        expect(store.getState().roles.error).toEqual(error);
    })

    test('removeRole success', async() => {
        const api = {
            addRole: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.roles.addRole(2);

        expect(api.addRole).toHaveBeenCalled();
    })

    test('removeRole error', async() => {
        const api = {
            addRole: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.roles.addRole(2);

        expect(api.addRole).toHaveBeenCalled();
        expect(store.getState().roles.error).toEqual(error);
    })
})

