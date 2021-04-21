import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import ChangePassword from "./ChangePassword";
import {TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("ChangePassword tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <ChangePassword  />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('new-password-input')
        await getByTestId('new-password-repeat-input')
        await getByTestId('change-password-button')
    })
})



