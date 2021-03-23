import { createStore } from 'easy-peasy';
import model from '../models';
import Api from '../api/index';

const store = createStore(model, {
    injections: { api: Api }
});
// window.store = store;

export default store;
