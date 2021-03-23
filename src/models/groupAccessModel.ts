import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../api";
import {IGroupWithAccess} from "../api/models/IGroup";
import {IUserGroup} from "../api/models/IUser";

export interface GroupAccessModel {
    accessibleGroups: IGroupWithAccess[],
    notAccessibleGroups: IGroupWithAccess[],
    error: Error | null,
    loading: boolean,
    setAccessibleGroups: Action<GroupAccessModel, IGroupWithAccess[]>
    setNotAccessibleGroups: Action<GroupAccessModel, IGroupWithAccess[]>
    setError: Action<GroupAccessModel, Error | null>
    setLoading: Action<GroupAccessModel, boolean>
    fetchUserAccessibleGroups: Thunk<GroupAccessModel, number>
    fetchUserNotAccessibleGroups: Thunk<GroupAccessModel, number>
    removeRights: Thunk<GroupAccessModel, IUserGroup[]>
    addRights: Thunk<GroupAccessModel, IUserGroup[]>
    toggleRecursiveRights: Thunk<GroupAccessModel, IUserGroup>
}

const groupAccess: GroupAccessModel = {
    accessibleGroups: [],
    notAccessibleGroups: [],
    error: null,
    loading: false,
    setAccessibleGroups: action((store, payload) => {
        store.accessibleGroups = payload;
    }),
    setNotAccessibleGroups: action((store, payload) => {
        store.notAccessibleGroups = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchUserAccessibleGroups: thunk(async (actions, userId, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.fetchUserAccessibleGroups(userId)
            .then(data => {
                actions.setAccessibleGroups(data);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    fetchUserNotAccessibleGroups: thunk(async (actions, userId, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.fetchUserNotAccessibleGroups(userId)
            .then(data => {
                actions.setNotAccessibleGroups(data);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    removeRights: thunk(async (actions, userGroupPairs, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.removeRights(userGroupPairs)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(userGroupPairs[0].user)
                actions.fetchUserAccessibleGroups(userGroupPairs[0].user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    addRights: thunk(async (actions, userGroupPairs, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.addRights(userGroupPairs)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(userGroupPairs[0].user)
                actions.fetchUserAccessibleGroups(userGroupPairs[0].user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
    toggleRecursiveRights: thunk(async (actions, userGroupPair, { injections }) => {
        const api: IApi = injections.api;

        actions.setLoading(true)
        await api.toggleRecursiveRights(userGroupPair)
            .then(() => {
                actions.fetchUserNotAccessibleGroups(userGroupPair.user)
                actions.fetchUserAccessibleGroups(userGroupPair.user)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default groupAccess;
