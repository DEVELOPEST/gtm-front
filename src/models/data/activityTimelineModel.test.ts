import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("activityTimelineModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.activityTimeline.setLoading(false)
        expect(store.getState().activityTimeline.loading).toEqual(false);

        store.dispatch.activityTimeline.setLoading(true)
        expect(store.getState().activityTimeline.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.activityTimeline.setError(error)
        expect(store.getState().activityTimeline.error).toEqual(error);

        store.dispatch.activityTimeline.setError(null)
        expect(store.getState().activityTimeline.error).toEqual(null);
    })

    test('data', async() => {
        const data = [getData()]
        store.dispatch.activityTimeline.setData(data)
        expect(store.getState().activityTimeline.data).toEqual(data);

        store.dispatch.activityTimeline.setData([])
        expect(store.getState().activityTimeline.data).toEqual([]);
    })

    test('fetchActivityTimeline success', async() => {
        const data = [getData()]

        const api = {
            getActivityTimeline: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.activityTimeline.fetchActivityTimeline();

        expect(api.getActivityTimeline).toHaveBeenCalled();
        expect(store.getState().activityTimeline.data).toEqual(data);
    })

    test('fetchActivityTimeline error', async() => {
        const api = {
            getActivityTimeline: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.activityTimeline.fetchActivityTimeline();

        expect(api.getActivityTimeline).toHaveBeenCalled();
        expect(store.getState().activityTimeline.error).toEqual(error);
    })

})

const getData = () => {
    return {
        label: "label",
        labelKey: 1,
        time: 1,
        linesAdded: 1,
        linesRemoved: 1,
        users: 1,
    }
}

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.dashboardInputs.setStartDate(new Date())
    store.dispatch.dashboardInputs.setEndDate(new Date())
    store.dispatch.dashboardInputs.setInterval('interval')
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "name",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
