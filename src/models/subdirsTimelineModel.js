import {action, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {TALLINN_TIMEZONE} from "../constants";

const SubdirsTimelineModel = {
    data: [],
    paths: [],
    error: '',
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
    fetchSubdirsTimeline: thunk(async (actions, interval, {injections, getStoreState}) => {
        const { api } = injections;
        const {startDate, endDate, chosenInterval} = getStoreState().dashboardInputs;
        const {chosenGroup} = getStoreState().groups;
        const {depth} = getStoreState().subdirsTimeline;
        let dto = {
            start: Math.floor(startOfDay(startDate).getTime() / 1000),
            end: Math.floor(startOfDay(endDate).getTime() / 1000),
            interval: chosenInterval.toUpperCase(),
            timezone: TALLINN_TIMEZONE,
            depth: depth
        }
        actions.setLoading(true)
        await api.getSubdirsTimeline({ "dto" : dto, 'group': chosenGroup.name})
            .then(data => {
                actions.setData(data.data);
                actions.setPaths(data.paths);
            })
            .catch(err => {
                actions.setError(err);
            })
        actions.setLoading(false);
    }),
};

export default SubdirsTimelineModel;
