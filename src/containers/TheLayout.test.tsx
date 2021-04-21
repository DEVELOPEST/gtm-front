import React from "react";
import {BrowserRouter} from "react-router-dom";
import {getByTestId, render, screen} from "@testing-library/react";
import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../models";
import TheLayout from "./TheLayout";
import {TEST_TOKEN} from "../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("TheLayout tests", () => {

    beforeEach(() => {
         store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter basename="/services/gtm/front">
                    <TheLayout />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('the-sidebar')
        await getByTestId('wrapper')
        await getByTestId('the-header')
        await getByTestId('body')
        await getByTestId('the-content')
        await getByTestId('the-footer')
    })
})
