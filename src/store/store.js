import { createStore } from 'easy-peasy';
import model from '../models';
import api from '../api';

const store = createStore(model, {
    injections: { api: api }
});
window.store = store;

export default store;
