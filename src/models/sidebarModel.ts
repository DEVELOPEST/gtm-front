import {Action, action} from 'easy-peasy';

export interface SidebarModel {
    sidebarShow: '' | true | false | 'responsive';
    setSidebarShow: Action<SidebarModel, '' | true | false | 'responsive'>;
}

const sidebar: SidebarModel = {
    sidebarShow: 'responsive',
    setSidebarShow: action((store, payload) => {
        store.sidebarShow = payload;
    }),
};

export default sidebar;
