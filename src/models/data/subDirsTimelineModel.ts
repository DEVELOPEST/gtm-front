import {Action, action, Thunk, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {IApi} from "../../api";
import {ISubDirLevelTimelineData} from "../../api/models/ITimeline";

export interface SubDirsTimelineModel {
    data: ISubDirLevelTimelineData[];
    paths: string[];
    error: Error | null;
    depth: number;
    loading: boolean;
    settings: SubDirsTimelineSettings;
    setData: Action<SubDirsTimelineModel, ISubDirLevelTimelineData[]>
    setPaths: Action<SubDirsTimelineModel, string[]>
    setDepth: Action<SubDirsTimelineModel, number>
    setError: Action<SubDirsTimelineModel, Error | null>
    setLoading: Action<SubDirsTimelineModel, boolean>
    setSettings: Action<SubDirsTimelineModel, SubDirsTimelineSettings>;
    fetchSubDirsTimeline: Thunk<SubDirsTimelineModel>
}

export interface SubDirsTimelineSettings {
    cumulative: boolean
}

const subDirsTimeline: SubDirsTimelineModel = {
    data: [],
    paths: [],
    error: null,
    depth: 2,
    loading: false,
    settings: {
        cumulative: false
    },
    setData: action((store, payload) => {
        store.data = payload;
    }),
    setPaths: action((store, payload) => {
       store.paths = payload;
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
    setSettings: action((store, payload) => {
        store.settings = payload;
    }),
    fetchSubDirsTimeline: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {startDate, endDate, interval} = getStoreState().dashboardInputs;
        // @ts-ignore
        const {chosenGroup} = getStoreState().groups;
        // @ts-ignore
        const {depth, settings} = getStoreState().subDirsTimeline;

        actions.setLoading(true)
        await api.getSubDirsTimeline(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            interval.toUpperCase(),
            depth,
            settings.cumulative
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
