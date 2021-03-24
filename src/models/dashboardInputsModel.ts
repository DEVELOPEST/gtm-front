import {Action, action} from 'easy-peasy';
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface DashboardInputsModel {
    startDate: Date,
    endDate: Date,
    intervals: string[],
    chosenInterval: string,
    error: AxiosError<IError> | null,
    loading: boolean,
    setStartDate: Action<DashboardInputsModel, Date>
    setEndDate: Action<DashboardInputsModel, Date>
    setChosenInterval: Action<DashboardInputsModel, string>
    setError: Action<DashboardInputsModel, AxiosError<IError> | null>
    setLoading: Action<DashboardInputsModel, boolean>
}

const dashboardInputs: DashboardInputsModel = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    intervals: ["Day", "Week", "Month", "Year"],
    chosenInterval: "Day",
    error: null,
    loading: false,
    setStartDate: action((store, payload) => {
        store.startDate = payload;
    }),
    setEndDate: action((store, payload) => {
        store.endDate = payload;
    }),
    setChosenInterval: action((store, payload) => {
        store.chosenInterval = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
};

export default dashboardInputs;
