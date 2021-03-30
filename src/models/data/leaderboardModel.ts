import {Action, action, Thunk, thunk} from "easy-peasy";
import {startOfDay} from "date-fns";
import {IApi} from "../../api";
import {IGroupFileStats, IGroupUserStats} from "../../api/models/IGroup";
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";

export interface LeaderboardModel {
    users: IGroupUserStats[],
    files: IGroupFileStats[],
    error: AxiosError<IError> | null,
    loading: boolean,
    setUsers: Action<LeaderboardModel, IGroupUserStats[]>
    setFiles: Action<LeaderboardModel, IGroupFileStats[]>
    setError: Action<LeaderboardModel, AxiosError<IError> | null>
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
        const {startDate, endDate, depth} = getStoreState().leaderboardInputs;
    // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        if (chosenGroup === null) return;

        actions.setLoading(true);
        await api.getGroupStats(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            depth
            )
            .then(data => {
                actions.setUsers(data.users);
                actions.setFiles(data.files);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false);
}),
}

export default leaderboard;
