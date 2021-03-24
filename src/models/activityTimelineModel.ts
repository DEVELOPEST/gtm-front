import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../api";
import {IActivityTimeline} from "../api/models/ITimeline";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface ActivityTimelineModel {
    data: IActivityTimeline[],
    error: AxiosError<IError> | null,
    loading: boolean,
    setData: Action<ActivityTimelineModel, IActivityTimeline[]>
    setError: Action<ActivityTimelineModel, AxiosError<IError> | null>
    setLoading: Action<ActivityTimelineModel, boolean>
    fetchActivityTimeline: Thunk<ActivityTimelineModel>
}

const activityTimeline: ActivityTimelineModel = {
    data: [],
    error: null,
    loading: false,
    setData: action((store, payload) => {
        store.data = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchActivityTimeline: thunk(async (actions, _, { injections, getStoreState }) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, chosenInterval} = getStoreState().dashboardInputs;
        // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        actions.setLoading(true)
        await api.getActivityTimeline(
            chosenGroup.name,
            Math.floor(startDate.getTime() / 1000),
            Math.floor(endDate.getTime() / 1000),
            chosenInterval.toUpperCase()
        )
            .then(data => {
                actions.setData(data)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default activityTimeline;
