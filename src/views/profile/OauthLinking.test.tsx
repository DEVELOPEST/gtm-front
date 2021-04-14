import {createStore, EasyPeasyConfig, Store, StoreProvider} from "easy-peasy";
import storeModel, {StoreModel} from "../../models";
import {cleanup, render} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import OAuthLinking from "./OauthLinking";
import {TEST_TOKEN} from "../../constants";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("OAuthLinking tests", () => {

    beforeEach(() => {
        store = createStore(storeModel);
        localStorage.setItem('token', TEST_TOKEN)
    });

    afterEach(cleanup)

    test('has content', async() => {
        const { getByTestId } = render(
            <StoreProvider store={store}>
                <BrowserRouter>
                    <OAuthLinking  />
                </BrowserRouter>
            </StoreProvider>
        );
        await getByTestId('github-button')
        await getByTestId('gitlab-button')
        await getByTestId('microsoft-button')
        await getByTestId('taltech-button')
        await getByTestId('bitbucket-button')
    })
})



