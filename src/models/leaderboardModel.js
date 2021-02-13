import {action, thunk} from "easy-peasy";
import {startOfDay} from "date-fns";

const leaderboardModel = {
    users: [],
    files: [],
    error: '',
    loading: false,
    setUsers: action((store, payload) => {
        store.users = payload;
    }),
    setFiles: action((store, payload) => {
        store.files = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchGroupStats: thunk(async (actions, interval, {injections, getStoreState}) => {
    const { api } = injections;
    const {startDate, endDate} = getStoreState().dashboardInputs;
    const {chosenGroup} = getStoreState().groups;
    let dto = {
        start: 0, // Math.floor(startOfDay(startDate).getTime() / 1000),
        end: Math.floor(startOfDay(endDate).getTime() / 1000),
        depth: 2,
    }
    actions.setLoading(true)
    await api.getGroupStats({ "dto" : dto, 'group': 'iti0102-2020'}) //chosenGroup.name})
        .then(data => {
            actions.setUsers(data.users);
            actions.setFiles(data.files);
            console.log(data.users)
        })
        .catch(err => {
            actions.setError(err)
        })
    actions.setLoading(false)
}),
}

export default leaderboardModel;
