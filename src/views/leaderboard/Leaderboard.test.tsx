import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import Leaderboard from "./Leaderboard";
import {TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("Leaderboard tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <Leaderboard />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('leaderboard')
        await getByTestId('leaderboard-inputs')
        await getByTestId('users-card')
        await getByTestId('files-card')
        await getByTestId('export-data-card')
        await getByTestId('export-data-button')

    })
})



