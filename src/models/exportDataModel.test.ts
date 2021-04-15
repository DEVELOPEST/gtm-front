import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "./index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess} from "../api/models/IGroup";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("exportDataModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.exportData.setLoading(false)
        expect(store.getState().exportData.loading).toEqual(false);

        store.dispatch.exportData.setLoading(true)
        expect(store.getState().exportData.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.exportData.setError(error)
        expect(store.getState().exportData.error).toEqual(error);

        store.dispatch.exportData.setError(null)
        expect(store.getState().exportData.error).toEqual(null);
    })

    test('data', async() => {
        const data = [getData()]
        store.dispatch.exportData.setData(data)
        expect(store.getState().exportData.data).toEqual(data);

        store.dispatch.exportData.setData([])
        expect(store.getState().exportData.data).toEqual([]);
    })

    test('fetchGroupExportData success', async() => {
        const data = [getData()]

        const api = {
            fetchGroupExportData: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.exportData.fetchGroupExportData();

        expect(api.fetchGroupExportData).toHaveBeenCalled();
        expect(store.getState().exportData.data).toEqual(data);
    })

    test('fetchGroupExportData error', async() => {
        const api = {
            fetchGroupExportData: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.exportData.fetchGroupExportData();

        expect(api.fetchGroupExportData).toHaveBeenCalled();
        expect(store.getState().exportData.error).toEqual(error);
    })

})

const getData = () => {
    return {
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

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.leaderboardInputs.setStartDate(new Date())
    store.dispatch.leaderboardInputs.setEndDate(new Date())
    store.dispatch.leaderboardInputs.setDepth(1)
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "name",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
