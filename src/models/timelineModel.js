import {action, thunk, useStoreState} from 'easy-peasy';
import {formatDate} from '../utils/dateUtils'
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
    setTimeData: action((store, payload) => {
        store.timeData = payload;
    }),
    setLabelsData: action((store, payload) => {
        store.labelsData = payload;
    }),
    setUsersData: action((store, payload) => {
        store.usersData = payload;
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
        await api.getTimeline(dto, chosenGroup)
            .then(data => {
                actions.setData(data.timeline)
                actions.setTimeData(data.timeline.map(item => Math.floor(item.time / 60 / 6) / 10))
                actions.setLabelsData(data.timeline.map(item => formatDate(Date.parse(item.start), interval)))
                actions.setUsersData(data.timeline.map(item => item.users))
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default TimelineModel;
