import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess} from "../../api/models/IGroup";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("activityTimelineModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.groups.setLoading(false)
        expect(store.getState().groups.loading).toEqual(false);

        store.dispatch.groups.setLoading(true)
        expect(store.getState().groups.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.groups.setError(error)
        expect(store.getState().groups.error).toEqual(error);

        store.dispatch.groups.setError(null)
        expect(store.getState().groups.error).toEqual(null);
    })

    test('groups', async() => {
        const data = [getData()]
        store.dispatch.groups.setGroups(data)
        expect(store.getState().groups.groups).toEqual(data);

        store.dispatch.groups.setGroups([])
        expect(store.getState().groups.groups).toEqual([]);
    })

    test('chosenGroup', async() => {
        const data = getData()
        store.dispatch.groups.setChosenGroup(data)
        expect(store.getState().groups.chosenGroup).toEqual(data);

        store.dispatch.groups.setChosenGroup(null)
        expect(store.getState().groups.chosenGroup).toEqual(null);
    })

    test('fetchGroups success', async() => {
        const data = [getData()]

        const api = {
            getGroups: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.groups.fetchGroups();

        expect(api.getGroups).toHaveBeenCalled();
        expect(store.getState().groups.groups).toEqual(data);
    })

    test('fetchGroups error', async() => {
        const api = {
            getGroups: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.groups.fetchGroups();

        expect(api.getGroups).toHaveBeenCalled();
        expect(store.getState().groups.error).toEqual(error);
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

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "name",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
