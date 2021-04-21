import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Register from "./Register";
import {TEST_TOKEN} from "../../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("Register tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Register  />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('username-input')
        await getByTestId('password-input')
        await getByTestId('password-repeat-input')
        await getByTestId('create-account-button')
    })
})



