import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import GroupAccess from "./GroupAccess";
import {TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("GroupAccess tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <GroupAccess  />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('show-sub-dirs-checkbox')
        await getByTestId('groups-dropdown')
        await getByTestId('give-rights-button')
    })
})



