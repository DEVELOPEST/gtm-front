import { action, thunk } from 'easy-peasy';
import {TALLINN_TIMEZONE} from "../constants";

const ActivityTimelineModel = {
    data: [],
    timeData: [],
    labelsData: [],
    usersData: [],
    addedLinesData: [],
    removedLinesData: [],
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
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchActivityTimeline: thunk(async (actions, payload, { injections, getStoreState }) => {
        const { api } = injections;
        const {startDate, endDate, chosenInterval} = getStoreState().dashboardInputs;
        const {chosenGroup} = getStoreState().groups;
        let dto = {
            start: Math.floor(startDate.getTime() / 1000),
            end: Math.floor(endDate.getTime() / 1000),
            interval: chosenInterval.toUpperCase(),
            timezone: TALLINN_TIMEZONE
        }
        actions.setLoading(true)
        await api.getActivityTimeline(dto, chosenGroup)
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
