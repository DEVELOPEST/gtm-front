import {Action, action, Thunk, thunk} from "easy-peasy";
import {startOfDay} from "date-fns";
import {IApi} from "../api";
import {IGroupFileStats, IGroupUserStats} from "../api/models/IGroup";

export interface LeaderboardModel {
    users: IGroupUserStats[],
    files: IGroupFileStats[],
    error: Error | null,
    loading: boolean,
    setUsers: Action<LeaderboardModel, IGroupUserStats[]>
    setFiles: Action<LeaderboardModel, IGroupFileStats[]>
    setError: Action<LeaderboardModel, Error | null>
    setLoading: Action<LeaderboardModel, boolean>
    fetchGroupStats: Thunk<LeaderboardModel>
}

const leaderboard: LeaderboardModel = {
    users: [],
    files: [],
    error: null,
    loading: false,
    setUsers: action((store, payload) => {
        store.users = payload;
    }),
    setFiles: action((store, payload) => {
        store.files = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchGroupStats: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
    // @ts-ignore
        const {startDate, endDate} = getStoreState().dashboardInputs;
    // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        if (chosenGroup === null) return

        actions.setLoading(true)
        await api.getGroupStats(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            2
            )
            .then(data => {
                actions.setUsers(data.users);
                actions.setFiles(data.files);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
}),
}

export default leaderboard;
