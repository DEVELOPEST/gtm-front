import React from "react";
import {BrowserRouter} from "react-router-dom";
import {getByTestId, render, screen} from "@testing-library/react";
import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../models";
import TheContent from "./TheContent";
import {TEST_TOKEN} from "../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("TheContent tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheContent />
                </BrowserRouter>
            </StoreProvider>
        );

        await getByTestId('the-content')
    })
})
