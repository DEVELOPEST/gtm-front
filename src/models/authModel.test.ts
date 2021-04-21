
import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "./index";
import {cleanup} from "@testing-library/react";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
// @ts-ignore
let windowSpy;

describe("authModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
        windowSpy = jest.spyOn(window, "window", "get");

    });

    afterEach(() => {
        cleanup()
        // @ts-ignore
        windowSpy.mockRestore();
    });

    test('loading', async() => {
        store.dispatch.auth.setLoading(false)
        expect(store.getState().auth.loading).toEqual(false);

        store.dispatch.auth.setLoading(true)
        expect(store.getState().auth.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.auth.setError(error)
        expect(store.getState().auth.error).toEqual(error);

        store.dispatch.auth.setError(null)
        expect(store.getState().auth.error).toEqual(null);
    })

    test('errors', async() => {

        // @ts-ignore
        store.dispatch.auth.setErrors(['test'])
        expect(store.getState().auth.errors).toEqual(['test']);

        store.dispatch.auth.setErrors([])
        expect(store.getState().auth.errors).toEqual([]);
    })

    test('logins', async() => {

        store.dispatch.auth.setLogins(['test'])
        expect(store.getState().auth.logins).toEqual(['test']);

        store.dispatch.auth.setLogins([])
        expect(store.getState().auth.logins).toEqual([]);
    })

    test('hasPassword', async() => {

        store.dispatch.auth.setHasPassword(true)
        expect(store.getState().auth.hasPassword).toEqual(true);

        store.dispatch.auth.setHasPassword(false)
        expect(store.getState().auth.hasPassword).toEqual(false);

        store.dispatch.auth.setHasPassword(null)
        expect(store.getState().auth.hasPassword).toEqual(null);
    })

    test('getPassword success', async() => {
        const api = {
            getPassword: jest.fn(() => Promise.resolve(true)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.getPassword();

        expect(api.getPassword).toHaveBeenCalled();
    })

    test('getPassword error', async() => {
        const api = {
            getPassword: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.getPassword();

        expect(store.getState().auth.error).toEqual(error);
        expect(api.getPassword).toHaveBeenCalled();
    })

    test('get_logins success', async() => {
        const api = {
            logins: jest.fn(() => Promise.resolve(['test'])),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.get_logins();

        expect(api.logins).toHaveBeenCalled();
        expect(store.getState().auth.logins).toEqual(['test']);

    })

    test('get_logins error', async() => {
        const api = {
            logins: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.get_logins();

        expect(store.getState().auth.error).toEqual(error);
        expect(api.logins).toHaveBeenCalled();
    })

    test('delete_login success', async() => {
        const api = {
            delete_login: jest.fn(() => Promise.resolve()),
            logins: jest.fn(() => Promise.resolve()),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.delete_login('test');

        expect(api.delete_login).toHaveBeenCalled();

    })

    test('delete_login error', async() => {
        const api = {
            delete_login: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.delete_login('test');

        expect(store.getState().auth.error).toEqual(error);
        expect(api.delete_login).toHaveBeenCalled();
    })

    test('delete_account success', async() => {
        const api = {
            delete_account: jest.fn(() => Promise.resolve()),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));

        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.delete_account();

        expect(api.delete_account).toHaveBeenCalled();

    })

    test('delete_account error', async() => {
        const api = {
            delete_account: jest.fn(() => Promise.reject(error)),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.delete_account();

        expect(store.getState().auth.error).toEqual(error);
        expect(api.delete_account).toHaveBeenCalled();
    })

    test('login success', async() => {
        const api = {
            login: jest.fn(() => Promise.resolve({jwt: 'token'})),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));

        const store = createStore(storeModel, {
            injections: { api: api },
        });
        // @ts-ignore
        await store.dispatch.auth.login();

        expect(api.login).toHaveBeenCalled();

    })

    test('login error', async() => {
        const api = {
            login: jest.fn(() => Promise.reject(error)),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        // @ts-ignore
        await store.dispatch.auth.login();

        expect(store.getState().auth.error).toEqual(error);
        expect(api.login).toHaveBeenCalled();
    })

    test('register success', async() => {
        const api = {
            register: jest.fn(() => Promise.resolve({jwt: 'token'})),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));

        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.register({username: 'name', password: 'password'});

        expect(api.register).toHaveBeenCalled();

    })

    test('register error', async() => {
        const api = {
            register: jest.fn(() => Promise.reject(error)),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.register({username: 'name', password: 'password'});

        expect(store.getState().auth.error).toEqual(error);
        expect(api.register).toHaveBeenCalled();
    })

    test('fetchToken success', async() => {
        const api = {
            fetchToken: jest.fn(() => Promise.resolve({jwt: 'token'})),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));

        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.fetchToken();

        expect(api.fetchToken).toHaveBeenCalled();

    })

    test('fetchToken error', async() => {
        const api = {
            fetchToken: jest.fn(() => Promise.reject(error)),
        };
        // @ts-ignore
        windowSpy.mockImplementation(() => ({
            location: {
                reload: () => {}
            }
        }));
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        await store.dispatch.auth.fetchToken();

        expect(store.getState().auth.error).toEqual(error);
        expect(api.fetchToken).toHaveBeenCalled();
    })

})
