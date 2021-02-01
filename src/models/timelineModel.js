import {action, thunk} from 'easy-peasy';
import {startOfDay} from 'date-fns';
import {TALLINN_TIMEZONE} from "../constants";

const TimelineModel = {
    data: [],
    timeData: [],
    labelsData: [],
    usersData: [],
    error: '',
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
    fetchTimeline: thunk(async (actions, interval, {injections, getStoreState}) => {
        const { api } = injections;
        const {startDate, endDate, chosenInterval} = getStoreState().dashboardInputs;
        const {chosenGroup} = getStoreState().groups;
        let dto = {
            start: Math.floor(startOfDay(startDate).getTime() / 1000),
            end: Math.floor(startOfDay(endDate).getTime() / 1000),
            interval: chosenInterval.toUpperCase(),
            timezone: TALLINN_TIMEZONE
        }
        actions.setLoading(true)
        await api.getTimeline({ "dto" : dto, 'group': chosenGroup.name})
            .then(data => {
                actions.setData(data.timeline)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default TimelineModel;
