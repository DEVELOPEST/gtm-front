import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../models";
import {render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import TheSidebar from "./TheSidebar";
import React from "react";
import {TEST_TOKEN} from "../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("TheSidebar tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheSidebar />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('the-sidebar')
        await getByTestId('dashboard')
        await getByTestId('leaderboard')
        await getByTestId('comparison')
    })
})
