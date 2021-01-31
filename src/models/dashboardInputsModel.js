import { action, thunk } from 'easy-peasy';

const dashboardInputsModel = {
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    intervals: ["Day", "Week", "Month", "Year"],
    chosenInterval: "Day",
    error: '',
    loading: false,
    setStartDate: action((store, payload) => {
        store.startDate = payload;
        console.log("startDate")
    }),
    setEndDate: action((store, payload) => {
        store.endDate = payload;
        console.log("endDate")
    }),
    setChosenInterval: action((store, payload) => {
        store.chosenInterval = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
};

export default dashboardInputsModel;
