import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Dashboard from "./Dashboard";
import {ACTIVITY_TIMELINE_MOCK_DATA, TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("Dashboard tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        store.dispatch.activityTimeline.setData(ACTIVITY_TIMELINE_MOCK_DATA)
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('dashboard')
        await getByTestId('dashboard-inputs')
        await getByTestId('time-and-users-card')
        await getByTestId('activity-hours-card')
        await getByTestId('files-card')

    })
})



