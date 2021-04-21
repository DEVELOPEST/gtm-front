import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess} from "../../api/models/IGroup";
import {ITimeline} from "../../api/models/ITimeline";
import timeline from "./timelineModel";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("timelineModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.timeline.setLoading(false)
        expect(store.getState().timeline.loading).toEqual(false);

        store.dispatch.timeline.setLoading(true)
        expect(store.getState().timeline.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.timeline.setError(error)
        expect(store.getState().timeline.error).toEqual(error);

        store.dispatch.timeline.setError(null)
        expect(store.getState().timeline.error).toEqual(null);
    })

    test('data', async() => {
        const data = [getData()]
        store.dispatch.timeline.setData(data)
        expect(store.getState().timeline.data).toEqual(data);

        store.dispatch.timeline.setData([])
        expect(store.getState().timeline.data).toEqual([]);
    })

    test('fetchTimeline success', async() => {
        const data = [getData()]

        const api = {
            getTimeline: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.timeline.fetchTimeline();

        expect(api.getTimeline).toHaveBeenCalled();
        expect(store.getState().timeline.data).toEqual(data);
    })

    test('fetchTimeline error', async() => {
        const api = {
            getTimeline: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.timeline.fetchTimeline();

        expect(api.getTimeline).toHaveBeenCalled();
        expect(store.getState().timeline.error).toEqual(error);
    })

})

const getData = () => {
    return {
        start: 'start',
        end: 'end',
        time: 1,
        users: 1,
    }
}

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.dashboardInputs.setStartDate(new Date())
    store.dispatch.dashboardInputs.setEndDate(new Date())
    store.dispatch.dashboardInputs.setInterval('interval')
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "groupName",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
