import {createStore, EasyPeasyConfig, Store} from "easy-peasy";
import storeModel, {StoreModel} from "../index";
import {cleanup} from "@testing-library/react";
import {IGroupAccess, IGroupFileStats, IGroupUserStats} from "../../api/models/IGroup";

let store: Store<StoreModel, EasyPeasyConfig<{}, any>>;
describe("leaderboardModel tests", () => {
    const error = {config: {}, isAxiosError: true, toJSON:() => {return {}}, message: 'message', name: 'name'}
    beforeEach(() => {
        store = createStore(storeModel);
    });

    afterEach(cleanup)

    test('loading', async() => {
        store.dispatch.leaderboard.setLoading(false)
        expect(store.getState().leaderboard.loading).toEqual(false);

        store.dispatch.leaderboard.setLoading(true)
        expect(store.getState().leaderboard.loading).toEqual(true);
    })

    test('error', async() => {

        store.dispatch.leaderboard.setError(error)
        expect(store.getState().leaderboard.error).toEqual(error);

        store.dispatch.leaderboard.setError(null)
        expect(store.getState().leaderboard.error).toEqual(null);
    })

    test('users', async() => {
        const data = [getUsersData()]
        store.dispatch.leaderboard.setUsers(data)
        expect(store.getState().leaderboard.users).toEqual(data);

        store.dispatch.leaderboard.setUsers([])
        expect(store.getState().leaderboard.users).toEqual([]);
    })

    test('files', async() => {
        const data = [getFilesData()]
        store.dispatch.leaderboard.setFiles(data)
        expect(store.getState().leaderboard.files).toEqual(data);

        store.dispatch.leaderboard.setFiles([])
        expect(store.getState().leaderboard.files).toEqual([]);
    })

    test('fetchGroupStats success', async() => {
        const data = getData()

        const api = {
            getGroupStats: jest.fn(() => Promise.resolve(data)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.leaderboard.fetchGroupStats();

        expect(api.getGroupStats).toHaveBeenCalled();
        expect(store.getState().leaderboard.users).toEqual(data.users);
        expect(store.getState().leaderboard.files).toEqual(data.files);
    })

    test('fetchGroupStats error', async() => {
        const api = {
            getGroupStats: jest.fn(() => Promise.reject(error)),
        };
        const store = createStore(storeModel, {
            injections: { api: api },
        });
        setUpStoreValues(store)

        await store.dispatch.leaderboard.fetchGroupStats();

        expect(api.getGroupStats).toHaveBeenCalled();
        expect(store.getState().leaderboard.error).toEqual(error);
    })

})

const getData = () => {
    return {
        users: getUsersData(),
        files: getFilesData(),
    }
}

const getUsersData = () => {
    return {
        name: 'name',
        totalTime: 1,
        linesAdded: 1,
        linesRemoved: 1,
        linesPerHour: 1,
        commits: 1,
        commitsPerHour: 1,
        linesPerCommit: 1,
    }
}

const getFilesData = () => {
    return {
        path: 'path',
        totalTime: 1,
        timePerUser: 1,
        linesAdded: 1,
        linesRemoved: 1,
        totalCommits: 1,
        commitsPerUser: 1,
        commitsPerHour: 1,
        users: 1,
        linesPerHour: 1,
    }
}

const setUpStoreValues = (store: Store<StoreModel, EasyPeasyConfig<{}, any>>) => {
    store.dispatch.leaderboardInputs.setStartDate(new Date())
    store.dispatch.leaderboardInputs.setEndDate(new Date())
    store.dispatch.leaderboardInputs.setDepth(1)
    store.dispatch.groups.setChosenGroup({
        id: 1,
        name: "name",
        addedAt: "addedAt",
        groupAccess:  null
    })
}
