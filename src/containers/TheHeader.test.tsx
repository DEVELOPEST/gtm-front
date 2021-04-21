import React from "react";
import {BrowserRouter} from "react-router-dom";
import {getByTestId, render, screen} from "@testing-library/react";
import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../models";
import TheHeader from "./TheHeader";
import {TEST_TOKEN} from "../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("TheHeader tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheHeader />
                </BrowserRouter>
            </StoreProvider>
        );

        await getByTestId('the-header')
        await getByTestId('dashboard-link')
        await getByTestId('the-header-settings-dropdown')
    })
})
