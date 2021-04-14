import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import TheHeaderSettingsDropdown from "./TheHeaderSettingsDropdown";
import React from "react";
import {TEST_TOKEN} from "../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("TheHeaderSettingsDropdown tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('has regular content', async() => {
        localStorage.setItem('token', TEST_TOKEN)

        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheHeaderSettingsDropdown />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('header-dropdown')
        await getByTestId('user-icon-toggle')
        await getByTestId('account-item')
        await getByTestId('profile-item')
        await getByTestId('profile-icon')
        await getByTestId('logout-item')
        await getByTestId('logout-icon')
    })

    test('has admin content', async() => {
        localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTg0MTM4NTcsImV4cCI6MTYxODUwMDI1NzQsInVzZXIiOjIyLCJ1c2VybmFtZSI6Ik1hcnRlbkp1cmciLCJyb2xlcyI6WyJBRE1JTiJdfQ.n8P_2SpAaGPslXt-O-E3b0UvGuDW1fJ7tpCaKagD_cw')

        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheHeaderSettingsDropdown />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('admin-item')
        await getByTestId('user-item')
        await getByTestId('user-icon')
    })
})
