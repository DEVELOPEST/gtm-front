import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "./index";
import {cleanup} from "@testing-library/react";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("SidebarModel tests", () => {
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('sidebar', async() => {
        store.dispatch.sidebar.setSidebarShow('responsive')
        expect(store.getState().sidebar.sidebarShow).toEqual('responsive');

        store.dispatch.sidebar.setSidebarShow(false)
        expect(store.getState().sidebar.sidebarShow).toEqual(false);

        store.dispatch.sidebar.setSidebarShow(true)
        expect(store.getState().sidebar.sidebarShow).toEqual(true);
    })
})

