import {Action, action, Thunk, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {ITimeline} from "../api/models/ITimeline";
import {IApi} from "../api";

export interface TimelineModel {
    data: ITimeline[];
    error: Error | null;
    loading: boolean;
    setData: Action<TimelineModel, ITimeline[]>
    setError: Action<TimelineModel, Error | null>;
    setLoading: Action<TimelineModel, boolean>;
    fetchTimeline: Thunk<TimelineModel>
}

const timeline: TimelineModel = {
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
    fetchTimeline: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, chosenInterval} = getStoreState().dashboardInputs;
        // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        actions.setLoading(true)
        await api.getTimeline(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            chosenInterval.toUpperCase()
        )
            .then(timeline => {
                actions.setData(timeline)
            })
            .catch((err: Error) => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default timeline;
