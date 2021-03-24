import {createStore, createTypedHooks} from 'easy-peasy';
import model, {StoreModel} from '../models';
import Api from '../api/index';

const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState, useStoreDispatch, useStore };

const store = createStore(model, {
    injections: { api: Api }
});
// window.store = store;

export default store;
