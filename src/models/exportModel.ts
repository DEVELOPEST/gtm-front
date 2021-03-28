import {Action, action, Thunk, thunk} from "easy-peasy";
import {startOfDay} from "date-fns";
import {IApi} from "../api";
import {IGroupExportDataEntry, IGroupFileStats, IGroupUserStats} from "../api/models/IGroup";
import {AxiosError} from "axios";
import {IError} from "../api/models/IError";

export interface ExportModel {
    data: IGroupExportDataEntry[] | null,
    error: AxiosError<IError> | null,
    loading: boolean,
    dataDownloaded: boolean
    setData: Action<ExportModel, IGroupExportDataEntry[] | null>
    setError: Action<ExportModel, AxiosError<IError> | null>
    setLoading: Action<ExportModel, boolean>
    fetchGroupExportData: Thunk<ExportModel>
}

const exportModel: ExportModel = {
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
        const {startDate, endDate} = getStoreState().dashboardInputs;
    // @ts-ignore
        const {chosenGroup} = getStoreState().groups;

        if (chosenGroup === null) return;

        actions.setLoading(true);
        await api.fetchGroupExportData(
            chosenGroup.name,
            Math.floor(startOfDay(startDate).getTime() / 1000),
            Math.floor(startOfDay(endDate).getTime() / 1000),
            2
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

export default exportModel;
