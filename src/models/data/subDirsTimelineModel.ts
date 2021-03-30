import {Action, action, Thunk, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {IApi} from "../../api";
import {ISubDirLevelTimelineData, ISubDirLevelTimelineEntry} from "../../api/models/ITimeline";

export interface SubDirsTimelineModel {
    data: ISubDirLevelTimelineData[];
    paths: string[];
    error: Error | null;
    depth: number;
    loading: boolean;
    setData: Action<SubDirsTimelineModel, ISubDirLevelTimelineData[]>
    setPaths: Action<SubDirsTimelineModel, string[]>
    setError: Action<SubDirsTimelineModel, Error | null>
    setLoading: Action<SubDirsTimelineModel, boolean>
    fetchSubDirsTimeline: Thunk<SubDirsTimelineModel>
}

const subDirsTimeline: SubDirsTimelineModel = {
    data: [],
    paths: [],
    error: null,
    depth: 2,
    loading: false,
    setData: action((store, payload) => {
        store.data = payload;
    }),
    setPaths: action((store, payload) => {
       store.paths = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchSubDirsTimeline: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, interval} = getStoreState().dashboardInputs;
        // @ts-ignore
        const {chosenGroup} = getStoreState().groups;
        // @ts-ignore
        const {depth} = getStoreState().subDirsTimeline;

        actions.setLoading(true)
        await api.getSubDirsTimeline(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            interval.toUpperCase(),
            depth
        )
            .then(subDirLevelTimelineWrapper => {
                actions.setData(subDirLevelTimelineWrapper.data);
                actions.setPaths(subDirLevelTimelineWrapper.paths);
            })
            .catch((err: Error) => {
                actions.setError(err);
            })
        actions.setLoading(false);
    }),
};

export default subDirsTimeline;
