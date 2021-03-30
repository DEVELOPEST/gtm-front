import {Action, action} from 'easy-peasy';
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";

export interface TimelineComparisonInputsModel {
    startDate: Date,
    endDate: Date,
    interval: string,
    error: AxiosError<IError> | null,
    loading: boolean,
    setStartDate: Action<TimelineComparisonInputsModel, Date>
    setEndDate: Action<TimelineComparisonInputsModel, Date>
    setInterval: Action<TimelineComparisonInputsModel, string>
    setError: Action<TimelineComparisonInputsModel, AxiosError<IError> | null>
    setLoading: Action<TimelineComparisonInputsModel, boolean>
}

const timelineComparisonInputs: TimelineComparisonInputsModel = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    interval: "Day",
    error: null,
    loading: false,
    setStartDate: action((store, payload) => {
        store.startDate = payload;
    }),
    setEndDate: action((store, payload) => {
        store.endDate = payload;
    }),
    setInterval: action((store, payload) => {
        store.interval = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
};

export default timelineComparisonInputs;
