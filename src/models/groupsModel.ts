import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IGroup, IGroupWithAccess} from "../api/models/IGroup";
import {IApi} from "../api";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface GroupsModel {
    groups: IGroupWithAccess[];
    chosenGroup: IGroupWithAccess | null;
    error: AxiosError<IError> | null;
    loading: boolean;
    setGroups: Action<GroupsModel, IGroupWithAccess[]>;
    setChosenGroup: Action<GroupsModel, IGroupWithAccess | null>;
    setError: Action<GroupsModel, AxiosError<IError> | null>;
    setLoading: Action<GroupsModel, boolean>;
    fetchGroups: Thunk<GroupsModel>;
}

const groups: GroupsModel = {
    groups: [],
    chosenGroup: null,
    error: null,
    loading: false,
    setGroups: action((store, payload) => {
        store.groups = payload;
    }),
    setChosenGroup: action((store, payload) => {
        store.chosenGroup = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchGroups: thunk(async (actions, _payload, { injections, getStoreState }) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const chosenGroup: IGroup = getStoreState().groups.chosenGroup;

        actions.setLoading(true)
        await api.getGroups()
            .then(groups => {
                actions.setGroups(groups)
                if (groups.length > 0 && chosenGroup === null) {
                    actions.setChosenGroup(groups[0])
                }
            })
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default groups;
