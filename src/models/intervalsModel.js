import {action, computed, thunk} from 'easy-peasy';

const intervalsModel = {
    intervals: ["Day", "Week", "Month", "Year"],
    chosenInterval: "Month",
    error: '',
    loading: false,
    requestInterval: computed( state => {
        switch (state.chosenInterval) {
            case 'Day':
                return 'HOUR';
            case 'Week':
                return 'DAY';
            case 'Month':
                return 'DAY';
            default:
                return 'MONTH';
        }
    }),
    setIntervals: action((store, payload) => {
        store.intervals = payload;
    }),
    setChosenInterval: action((store, payload) => {
        store.chosenInterval = payload;
    }),
};

export default intervalsModel;
