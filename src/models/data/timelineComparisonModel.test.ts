import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess} from "../../api/models/IGroup";
import {ITimeline} from "../../api/models/ITimeline";
import timeline from "./timelineModel";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("timelineComparisonModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.timelineComparison.setLoading(false)
        expect(store.getState().timelineComparison.loading).toEqual(false);

        store.dispatch.timelineComparison.setLoading(true)
        expect(store.getState().timelineComparison.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.timelineComparison.setError(error)
        expect(store.getState().timelineComparison.error).toEqual(error);

        store.dispatch.timelineComparison.setError(null)
        expect(store.getState().timelineComparison.error).toEqual(null);
    })

    test('data', async() => {
        const data = [getData()]
        store.dispatch.timelineComparison.setData(data)
        expect(store.getState().timelineComparison.data).toEqual(data);

        store.dispatch.timelineComparison.setData([])
        expect(store.getState().timelineComparison.data).toEqual([]);
    })

    test('chosenGroups', async() => {
        const data = [getChosenGroup()]
        store.dispatch.timelineComparison.setChosenGroups(data)
        expect(store.getState().timelineComparison.chosenGroups).toEqual(data);

        store.dispatch.timelineComparison.setChosenGroups([])
        expect(store.getState().timelineComparison.chosenGroups).toEqual([]);
    })

    test('fetchTimelines success', async() => {
        const data = getData()

        const api = {
            getTimeline: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.timelineComparison.fetchTimelines();

        expect(api.getTimeline).toHaveBeenCalled();
        expect(store.getState().timelineComparison.data).toEqual([{groupName: data.groupName, timeline: data}]);
    })

    test('fetchTimelines error', async() => {
        const api = {
            getTimeline: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.timelineComparison.fetchTimelines();

        expect(api.getTimeline).toHaveBeenCalled();
        expect(store.getState().timelineComparison.error).toEqual(error);
    })

})

const getData = () => {
    return {
        groupName: 'groupName',
        timeline: {
            start: 'start',
            end: 'end',
            time: 1,
            users: 1,
        }
    }
}

const getChosenGroup = () => {
    return {
        id: 1,
        name: 'name',
        addedAt: 'addedAt',
        groupAccess: null
    }
}

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.timelineComparisonInputs.setStartDate(new Date())
    store.dispatch.timelineComparisonInputs.setEndDate(new Date())
    store.dispatch.timelineComparisonInputs.setInterval('interval')
    store.dispatch.timelineComparison.setChosenGroups([{
        id: 1,
        name: "groupName",
        addedAt: "addedAt",
        groupAccess:  null
    }])
}
