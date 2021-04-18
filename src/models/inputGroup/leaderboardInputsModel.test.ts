import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";


let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("leaderboardInputsModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.leaderboardInputs.setLoading(false)
        expect(store.getState().leaderboardInputs.loading).toEqual(false);

        store.dispatch.leaderboardInputs.setLoading(true)
        expect(store.getState().leaderboardInputs.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.leaderboardInputs.setError(error)
        expect(store.getState().leaderboardInputs.error).toEqual(error);

        store.dispatch.leaderboardInputs.setError(null)
        expect(store.getState().leaderboardInputs.error).toEqual(null);
    })

    test('depth', async() => {
        store.dispatch.leaderboardInputs.setDepth(1)
        expect(store.getState().leaderboardInputs.depth).toEqual(1);
    })

    test('startDate', async() => {
        const date = new Date()
        store.dispatch.leaderboardInputs.setStartDate(date)
        expect(store.getState().leaderboardInputs.startDate).toEqual(date);
    })

    test('endDate', async() => {
        const date = new Date()
        store.dispatch.leaderboardInputs.setEndDate(date)
        expect(store.getState().leaderboardInputs.endDate).toEqual(date);
    })
})
