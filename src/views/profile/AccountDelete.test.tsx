import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import AccountDelete from "./AccountDelete";
import {TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("AccountDelete tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <AccountDelete  />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('deletion-confirmation-label')
        await getByTestId('deletion-confirmation-input')
        await getByTestId('deletion-confirmation-button')
    })
})



