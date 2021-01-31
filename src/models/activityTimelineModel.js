import { action, thunk } from 'easy-peasy';
import {formatDate, getStartDate, getEndDate, getRequestInterval} from '../utils/dateUtils'

const ActivityTimelineModel = {
    data: [],
    timeData: [],
    labelsData: [],
    usersData: [],
    addedLinesData: [],
    removedLinesData: [],
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), 1),
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
    setAddedLinesData: action((store, payload) => {
        store.addedLinesData = payload;
    }),
    setRemovedLinesData: action((store, payload) => {
        store.removedLinesData = payload;
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
    fetchActivityTimeline: thunk(async (actions, interval, { injections, getState }) => {
        const { api } = injections;
        const {startDate} = getState(state => state.activityTimeline);
        const {endDate} = getState(state => state.activityTimeline);
        let dto = {
            start: Math.floor(startDate.getTime() / 1000),
            end: Math.floor(endDate.getTime() / 1000),
            interval: getRequestInterval(interval),
            timezone: "Europe/Tallinn"
        }
        actions.setLoading(true)
        await api.getActivityTimeline(dto)
            .then(data => {
                actions.setData(data.activityTimeline)
                actions.setTimeData(data.activityTimeline.map(item => Math.floor(item.time / 60 / 6) / 10))
                actions.setLabelsData(data.activityTimeline.map(item => item.label))
                actions.setUsersData(data.activityTimeline.map(item => item.users))
                actions.setAddedLinesData(data.activityTimeline.map(item => item.linesAdded))
                actions.setRemovedLinesData(data.activityTimeline.map(item => item.linesRemoved))
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default ActivityTimelineModel;
