import { action, thunk } from 'easy-peasy';
import {formatDate, getStartDate, getEndDate, getRequestInterval} from '../utils/dateUtils'

const TimelineModel = {
    data: [],
    timeData: [],
    labelsData: [],
    usersData: [],
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
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
    setStartDate: action((store, payload) => {
        store.startDate = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchTimeline: thunk(async (actions, interval, { injections, getState }) => {
        const { api } = injections;
        const {startDate} = getState(state => state.timeline);
        let dto = {
            start: Math.floor(getStartDate(startDate, interval).getTime() / 1000),
            end: Math.floor(getEndDate(startDate, interval).getTime() / 1000),
            interval: getRequestInterval(interval),
            timezone: "Europe/Tallinn"
        }
        actions.setLoading(true)
        await api.getTimeline(dto)
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
