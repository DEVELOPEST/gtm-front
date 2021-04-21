import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {ADMIN} from "../../constants";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("userModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.user.setLoading(false)
        expect(store.getState().user.loading).toEqual(false);

        store.dispatch.user.setLoading(true)
        expect(store.getState().user.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.user.setError(error)
        expect(store.getState().user.error).toEqual(error);

        store.dispatch.user.setError(null)
        expect(store.getState().user.error).toEqual(null);
    })

    test('user', async() => {
        const data = getData()
        store.dispatch.user.setUser(data)
        expect(store.getState().user.user).toEqual(data);

        store.dispatch.user.setUser(null)
        expect(store.getState().user.user).toEqual(null);
    })

    test('fetchUser success', async() => {
        const data = [getData()]
        const api = {
            getUser: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.user.fetchUser(1);

        expect(api.getUser).toHaveBeenCalled();
        expect(store.getState().user.user).toEqual(data);

    })

    test('fetchUser error', async() => {
        const api = {
            getUser: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });

        await store.dispatch.user.fetchUser(1);

        expect(api.getUser).toHaveBeenCalled();
        expect(store.getState().user.error).toEqual(error);
    })
})

const getData = () => {
    return {
        id: 1,
        username: 'username',
        roles: [ADMIN],
    }
}
