import {Action, action} from 'easy-peasy';

export interface SidebarModel {
    sidebarShow: string;
    setSidebarShow: Action<SidebarModel, string>;
}

const sidebar: SidebarModel = {
    sidebarShow: 'responsive',
    setSidebarShow: action((store, payload) => {
        store.sidebarShow = payload;
    }),
};

export default sidebar;
