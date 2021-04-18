import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("passwordChangeModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.passwordChange.setLoading(false)
        expect(store.getState().passwordChange.loading).toEqual(false);

        store.dispatch.passwordChange.setLoading(true)
        expect(store.getState().passwordChange.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.passwordChange.setError(error)
        expect(store.getState().passwordChange.error).toEqual(error);

        store.dispatch.passwordChange.setError(null)
        expect(store.getState().passwordChange.error).toEqual(null);
    })

    test('success', async() => {

        store.dispatch.passwordChange.setSuccess(true)
        expect(store.getState().passwordChange.success).toEqual(true);

        store.dispatch.passwordChange.setSuccess(null)
        expect(store.getState().passwordChange.success).toEqual(null);
    })

    test('oldPassword', async() => {
        store.dispatch.passwordChange.setOldPassword("data")
        expect(store.getState().passwordChange.oldPassword).toEqual("data");
    })

    test('newPassword', async() => {
        store.dispatch.passwordChange.setNewPassword("data")
        expect(store.getState().passwordChange.newPassword).toEqual("data");
    })

    test('newPasswordRepeat', async() => {
        store.dispatch.passwordChange.setNewPasswordRepeat("data")
        expect(store.getState().passwordChange.newPasswordRepeat).toEqual("data");
    })

    test('changePassword success', async() => {
        const api = {
            changePassword: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.passwordChange.changePassword();

        expect(api.changePassword).toHaveBeenCalled();
        expect(store.getState().passwordChange.error).toEqual(null);
        expect(store.getState().passwordChange.success).toEqual(true);
        expect(store.getState().passwordChange.oldPassword).toEqual('');
        expect(store.getState().passwordChange.newPassword).toEqual('');
        expect(store.getState().passwordChange.newPasswordRepeat).toEqual('');
    })

    test('changePassword error', async() => {
        const api = {
            changePassword: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.passwordChange.changePassword();

        expect(api.changePassword).toHaveBeenCalled();
        expect(store.getState().passwordChange.error).toEqual(error);
    })

    test('createPassword success', async() => {
        const api = {
            createPassword: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.passwordChange.createPassword();

        expect(api.createPassword).toHaveBeenCalled();
        expect(store.getState().passwordChange.error).toEqual(null);
        expect(store.getState().passwordChange.success).toEqual(true);
        expect(store.getState().passwordChange.oldPassword).toEqual('');
        expect(store.getState().passwordChange.newPassword).toEqual('');
        expect(store.getState().passwordChange.newPasswordRepeat).toEqual('');
    })

    test('createPassword error', async() => {
        const api = {
            createPassword: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.passwordChange.createPassword();

        expect(api.createPassword).toHaveBeenCalled();
        expect(store.getState().passwordChange.error).toEqual(error);
    })

})


const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.passwordChange.setOldPassword('oldPw')
    store.dispatch.passwordChange.setNewPassword('newPassword')
    store.dispatch.passwordChange.setNewPasswordRepeat('newPassword')
}
