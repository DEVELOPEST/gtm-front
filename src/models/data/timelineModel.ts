import {Action, action, Thunk, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {ITimeline} from "../../api/models/ITimeline";
import {IApi} from "../../api";
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";

export interface TimelineModel {
    data: ITimeline[];
    error: AxiosError<IError> | null;
    loading: boolean;
    settings: TimelineSettings;
    setData: Action<TimelineModel, ITimeline[]>
    setError: Action<TimelineModel, AxiosError<IError> | null>;
    setLoading: Action<TimelineModel, boolean>;
    setSettings: Action<TimelineModel, TimelineSettings>;
    fetchTimeline: Thunk<TimelineModel>
}

export interface TimelineSettings {
    average: boolean
    cumulative: boolean
}

const timeline: TimelineModel = {
    data: [],
    error: null,
    loading: false,
    settings: {
        average: false,
        cumulative: false
    },
    setData: action((store, payload) => {
        store.data = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    setSettings: action((store, payload) => {
        store.settings = payload;
    }),
    fetchTimeline: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, interval} = getStoreState().dashboardInputs;
        // @ts-ignore
        const {chosenGroup} = getStoreState().groups;
        // @ts-ignore
        const {settings} = getStoreState().timeline;

        actions.setLoading(true)
        await api.getTimeline(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            interval.toUpperCase(),
            settings.cumulative
        )
            .then(timeline => {
                actions.setData(timeline)
            })
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default timeline;
