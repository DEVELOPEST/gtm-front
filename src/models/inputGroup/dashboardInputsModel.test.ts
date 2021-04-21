import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("dashboardInputsModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.dashboardInputs.setLoading(false)
        expect(store.getState().dashboardInputs.loading).toEqual(false);

        store.dispatch.dashboardInputs.setLoading(true)
        expect(store.getState().dashboardInputs.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.dashboardInputs.setError(error)
        expect(store.getState().dashboardInputs.error).toEqual(error);

        store.dispatch.dashboardInputs.setError(null)
        expect(store.getState().dashboardInputs.error).toEqual(null);
    })

    test('interval', async() => {
        store.dispatch.dashboardInputs.setInterval('test')
        expect(store.getState().dashboardInputs.interval).toEqual('test');
    })

    test('startDate', async() => {
        const date = new Date()
        store.dispatch.dashboardInputs.setStartDate(date)
        expect(store.getState().dashboardInputs.startDate).toEqual(date);
    })

    test('endDate', async() => {
        const date = new Date()
        store.dispatch.dashboardInputs.setEndDate(date)
        expect(store.getState().dashboardInputs.endDate).toEqual(date);
    })
})
