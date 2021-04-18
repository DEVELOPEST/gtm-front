import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("timelineComparisonInputsModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.timelineComparisonInputs.setLoading(false)
        expect(store.getState().timelineComparisonInputs.loading).toEqual(false);

        store.dispatch.timelineComparisonInputs.setLoading(true)
        expect(store.getState().timelineComparisonInputs.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.timelineComparisonInputs.setError(error)
        expect(store.getState().timelineComparisonInputs.error).toEqual(error);

        store.dispatch.timelineComparisonInputs.setError(null)
        expect(store.getState().timelineComparisonInputs.error).toEqual(null);
    })

    test('interval', async() => {
        store.dispatch.timelineComparisonInputs.setInterval('test')
        expect(store.getState().timelineComparisonInputs.interval).toEqual('test');
    })

    test('startDate', async() => {
        const date = new Date()
        store.dispatch.timelineComparisonInputs.setStartDate(date)
        expect(store.getState().timelineComparisonInputs.startDate).toEqual(date);
    })

    test('endDate', async() => {
        const date = new Date()
        store.dispatch.timelineComparisonInputs.setEndDate(date)
        expect(store.getState().timelineComparisonInputs.endDate).toEqual(date);
    })
})
