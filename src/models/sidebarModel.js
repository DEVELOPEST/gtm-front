import { action, thunk } from 'easy-peasy';

const sidebarModel = {
    sidebarShow: 'responsive',
    setSidebarShow: action((store, payload) => {
        store.sidebarShow = payload;
    }),
};

export default sidebarModel;
