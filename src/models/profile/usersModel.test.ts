import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {ADMIN} from "../../constants";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("usersModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.users.setLoading(false)
        expect(store.getState().users.loading).toEqual(false);

        store.dispatch.users.setLoading(true)
        expect(store.getState().users.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.users.setError(error)
        expect(store.getState().users.error).toEqual(error);

        store.dispatch.users.setError(null)
        expect(store.getState().users.error).toEqual(null);
    })

    test('users', async() => {
        const data = [getData()]
        store.dispatch.users.setUsers(data)
        expect(store.getState().users.users).toEqual(data);

        store.dispatch.users.setUsers([])
        expect(store.getState().users.users).toEqual([]);
    })

    test('fetchUsers success', async() => {
        const data = [getData()]
        const api = {
            getUsers: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.users.fetchUsers();

        expect(api.getUsers).toHaveBeenCalled();
        expect(store.getState().users.users).toEqual(data);

    })

    test('fetchUsers error', async() => {
        const api = {
            getUsers: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.users.fetchUsers();

        expect(api.getUsers).toHaveBeenCalled();
        expect(store.getState().users.error).toEqual(error);
    })
})

const getData = () => {
    return {
        id: 1,
        username: 'username',
        roles: [ADMIN],
    }
}
