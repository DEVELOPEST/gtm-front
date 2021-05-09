import {Action, action, Thunk, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {ITimeline} from "../../api/models/ITimeline";
import {IApi} from "../../api";
import {AxiosError} from "axios";
import {IError} from "../../api/models/IError";
import {IGroupWithAccess} from "../../api/models/IGroup";
import groups from "./groupsModel";
import {TimelineSettings} from "./timelineModel";

export interface TimelineComparisonModel {
    data: dataObject[];
    error: AxiosError<IError> | null;
    loading: boolean;
    settings: TimelineComparisonSettings;
    chosenGroups: IGroupWithAccess[];
    addData: Action<TimelineComparisonModel, dataObject>
    setData: Action<TimelineComparisonModel, dataObject[]>
    setChosenGroups: Action<TimelineComparisonModel, IGroupWithAccess[]>
    setError: Action<TimelineComparisonModel, AxiosError<IError> | null>;
    setLoading: Action<TimelineComparisonModel, boolean>;
    setSettings: Action<TimelineComparisonModel, TimelineComparisonSettings>;
    fetchTimelines: Thunk<TimelineComparisonModel>
}

export interface TimelineComparisonSettings {
    cumulative: boolean
}

export interface dataObject {
    groupName: string
    timeline: ITimeline[]
}

const timelineComparison: TimelineComparisonModel = {
    data: [],
    chosenGroups: [],
    error: null,
    loading: false,
    settings: {
        cumulative: false
    },
    addData: action((store, payload) => {
        store.data.push(payload);
    }),
    setData: action((store, payload) => {
        store.data = payload;
    }),
    setChosenGroups: action((store, payload) => {
        store.chosenGroups = payload;
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
    fetchTimelines: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, interval} = getStoreState().timelineComparisonInputs;
        // @ts-ignore
        const {chosenGroups, settings} = getStoreState().timelineComparison;

        actions.setLoading(true)
        await chosenGroups.forEach((group: IGroupWithAccess) => {
            api.getTimeline(
                group.name,
                Math.floor(startOfDay(startDate).getTime() / 1000),
                Math.floor(startOfDay(endDate).getTime() / 1000),
                interval.toUpperCase(),
                settings.cumulative
            ).then(timeline => {
                actions.addData({groupName: group.name, timeline: timeline})
            })
            .catch((err: AxiosError<IError>) => {
                actions.setError(err)
            })
        })

        actions.setLoading(false)
    }),
};

export default timelineComparison;
