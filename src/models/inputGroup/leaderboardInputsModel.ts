import {Action, action} from 'easy-peasy';
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";

export interface LeaderboardInputsModel {
    startDate: Date,
    endDate: Date,
    depth: number,
    error: AxiosError<IError> | null,
    loading: boolean,
    setStartDate: Action<LeaderboardInputsModel, Date>
    setEndDate: Action<LeaderboardInputsModel, Date>
    setDepth: Action<LeaderboardInputsModel, number>
    setError: Action<LeaderboardInputsModel, AxiosError<IError> | null>
    setLoading: Action<LeaderboardInputsModel, boolean>
}

const leaderboardInputsModel: LeaderboardInputsModel = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    depth: 2,
    error: null,
    loading: false,
    setStartDate: action((store, payload) => {
        store.startDate = payload;
    }),
    setEndDate: action((store, payload) => {
        store.endDate = payload;
    }),
    setDepth: action((store, payload) => {
        store.depth = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
};

export default leaderboardInputsModel;
