import {Action, action, Thunk, thunk} from "easy-peasy";
import {startOfDay} from "date-fns";
import {IApi} from "../api";
import {IGroupExportDataEntry, IGroupFileStats, IGroupUserStats} from "../api/models/IGroup";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface ExportDataModel {
    data: IGroupExportDataEntry[] | null,
    error: AxiosError<IError> | null,
    loading: boolean,
    dataDownloaded: boolean
    setData: Action<ExportDataModel, IGroupExportDataEntry[] | null>
    setError: Action<ExportDataModel, AxiosError<IError> | null>
    setLoading: Action<ExportDataModel, boolean>
    fetchGroupExportData: Thunk<ExportDataModel>
}

const exportData: ExportDataModel = {
    data: [],
    error: null,
    loading: false,
    dataDownloaded: false,
    setData: action((store, payload) => {
        store.data = payload;
        store.dataDownloaded = payload != null;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    fetchGroupExportData: thunk(async (actions, _, {injections, getStoreState}) => {
        const api: IApi = injections.api;
    // @ts-ignore
        const {startDate, endDate, depth} = getStoreState().leaderboardInputs;
    // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        if (chosenGroup === null) return;

        actions.setLoading(true);
        await api.fetchGroupExportData(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            depth
            )
            .then(data => {
                actions.setData(data);
            })
            .catch(err => {
                actions.setError(err)
            })
        actions.setLoading(false);
}),
}

export default exportData;
