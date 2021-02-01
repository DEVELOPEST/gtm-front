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
        console.log(chosenGroup)
        let dto = {
            start: Math.floor(startDate.getTime() / 1000),
            end: Math.floor(endDate.getTime() / 1000),
            interval: chosenInterval.toUpperCase(),
            timezone: TALLINN_TIMEZONE
        }
        actions.setLoading(true)
        await api.getActivityTimeline({'dto': dto,'group': chosenGroup.name})
            .then(data => {
                actions.setData(data.activityTimeline)
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false)
    }),
};

export default ActivityTimelineModel;
