import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess, IGroupFileStats, IGroupUserStats} from "../../api/models/IGroup";
import {IDictionary, ISubDirLevelTimelineEntry} from "../../api/models/ITimeline";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("subDirsTimelineModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.subDirsTimeline.setLoading(false)
        expect(store.getState().subDirsTimeline.loading).toEqual(false);

        store.dispatch.subDirsTimeline.setLoading(true)
        expect(store.getState().subDirsTimeline.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.subDirsTimeline.setError(error)
        expect(store.getState().subDirsTimeline.error).toEqual(error);

        store.dispatch.subDirsTimeline.setError(null)
        expect(store.getState().subDirsTimeline.error).toEqual(null);
    })

    test('data', async() => {
        const data = [getTimelineData()]
        store.dispatch.subDirsTimeline.setData(data)
        expect(store.getState().subDirsTimeline.data).toEqual(data);

        store.dispatch.subDirsTimeline.setData([])
        expect(store.getState().subDirsTimeline.data).toEqual([]);
    })

    test('paths', async() => {
        const data = [getPathsData()]
        store.dispatch.subDirsTimeline.setPaths(data)
        expect(store.getState().subDirsTimeline.paths).toEqual(data);

        store.dispatch.subDirsTimeline.setPaths([])
        expect(store.getState().subDirsTimeline.paths).toEqual([]);
    })

    test('fetchSubDirsTimeline success', async() => {
        const data = getData()

        const api = {
            getSubDirsTimeline: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.subDirsTimeline.fetchSubDirsTimeline();

        expect(api.getSubDirsTimeline).toHaveBeenCalled();
        expect(store.getState().subDirsTimeline.data).toEqual(data.data);
        expect(store.getState().subDirsTimeline.paths).toEqual(data.paths);
    })

    test('fetchSubDirsTimeline error', async() => {
        const api = {
            getSubDirsTimeline: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.subDirsTimeline.fetchSubDirsTimeline();

        expect(api.getSubDirsTimeline).toHaveBeenCalled();
        expect(store.getState().subDirsTimeline.error).toEqual(error);
    })

})

const getData = () => {
    return {
        paths: getPathsData(),
        data: getTimelineData(),
    }
}

const getTimelineData = () => {
    return {
        start: 'start',
        end: 'end',
        directories: {},
    }
}

const getPathsData = () => {
    return 'path'
}

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.dashboardInputs.setStartDate(new Date())
    store.dispatch.dashboardInputs.setEndDate(new Date())
    store.dispatch.dashboardInputs.setInterval('interval')
    store.dispatch.subDirsTimeline.setDepth(1)
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "name",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
