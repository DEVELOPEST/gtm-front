import axios, {AxiosResponse} from 'axios';
import {
    BASE_URL,
    TALLINN_TIMEZONE
} from "../constants";
import {IGroup, IGroupStats, IGroupWithAccess} from "./models/IGroup";
import {IJsonWebToken, IUser, IUserCredentials} from "./models/IUser";
import {IActivityTimeline, ISubDirLevelTimelineWrapper, ITimeline} from "./models/ITimeline";
import {IRepository, ITrackedRepository} from "./models/IRepository";

export interface IApi {
    fetch<T> (opts: any): Promise<T>

    // ===================================================== Timeline =========================================================
    getTimeline: (group: string, start: number, end: number, interval: string, timezone?: string) => Promise<ITimeline[]>
    getActivityTimeline: (group: string, start: number, end: number, interval: string, timezone?: string) => Promise<IActivityTimeline[]>
    getSubDirsTimeline: (group: string, start: number, end: number, interval: string, depth: number, timezone?: string) => Promise<ISubDirLevelTimelineWrapper>

    // ===================================================== Leaderboards =========================================================
    getGroupStats: (group: string, start: number, end: number, depth: number) => Promise<IGroupStats>

    // ===================================================== Groups =========================================================
    getGroups: () => Promise<IGroupWithAccess[]>
    fetchUserAccessibleGroups: (userId: number) => Promise<IGroupWithAccess[]>
    fetchUserNotAccessibleGroups: (userId: number) => Promise<IGroupWithAccess[]>

    // ===================================================== Groups rights add/remove =========================================================
    removeRights: (params: Object) => Promise<AxiosResponse<Object>>
    addRights: (params: Object) => Promise<AxiosResponse<Object>>
    toggleRecursiveRights: (params: Object) => Promise<AxiosResponse<Object>>

    // ===================================================== Users =========================================================
    getUsers: () => Promise<IUser[]>
    getUser: (userId: number) => Promise<IUser>

    // ===================================================== Roles =========================================================
    addRole: (params: Object) => Promise<AxiosResponse<Object>>
    removeRole: (params: Object) => Promise<AxiosResponse<Object>>

    // ===================================================== Repositories =========================================================
    fetchRepositories: () => Promise<IRepository[]>
    postRepository: (params: Object) => Promise<ITrackedRepository>

    // ===================================================== Auth =========================================================
    login: (params: IUserCredentials) => Promise<IJsonWebToken>
    logins: () => Promise<string[]>
    delete_login: (login_type: string) => Promise<void>
    delete_account: () => Promise<void>
    register: (params: IUserCredentials) => Promise<IJsonWebToken>
    fetchToken: () => Promise<IJsonWebToken>
    changePassword: (params: Object) => Promise<void>
    createPassword: (params: Object) => Promise<void>
    getPassword: () => Promise<boolean>
}

const Api: IApi =  {

    fetch<Type>(opts: any): Promise<Type>{
        return axios
            .request({
                ...opts,
                baseURL: opts.baseURL || BASE_URL,
                mode: 'no-cors'
            })
            .then(response => response.data);
    },

    // ===================================================== Timeline =========================================================

    getTimeline(group: string, start: number, end: number, interval: string, timezone: string = TALLINN_TIMEZONE): Promise<ITimeline[]> {
        return this.fetch({url: `/api/${group}/timeline?start=${start}&end=${end}&interval=${interval}&timezone=${timezone}`, method: 'GET'});
    },

    getActivityTimeline(group: string, start: number, end: number, interval: string, timezone: string = TALLINN_TIMEZONE): Promise<IActivityTimeline[]> {
        return this.fetch({url: `/api/${group}/activity?start=${start}&end=${end}&interval=${interval}&timezone=${timezone}`, method: 'GET'});
    },

    getSubDirsTimeline(group: string, start: number, end: number, interval: string, depth: number, timezone: string = TALLINN_TIMEZONE): Promise<ISubDirLevelTimelineWrapper> {
        return this.fetch(
            {url: `/api/${group}/subdirs-timeline?start=${start}&end=${end}&interval=${interval}&timezone=${timezone}&depth=${depth}`, method: 'GET'});
    },

    // ===================================================== Leaderboards =========================================================

    getGroupStats(group: string, start: number, end: number, depth: number): Promise<IGroupStats> {
        return this.fetch({url: `/api/groups/${group}/stats?start=${start}&end=${end}&depth=${depth}`, method: 'GET'});
    },

    // ===================================================== Groups =========================================================

    getGroups(): Promise<IGroupWithAccess[]> {
        return this.fetch({url: `/api/groups`, method: 'GET'});
    },

    fetchUserAccessibleGroups(userId: number): Promise<IGroupWithAccess[]> {
        return this.fetch({url: `/api/groups/accessible/user/${userId}`, method: 'GET'});
    },

    fetchUserNotAccessibleGroups(userId: number): Promise<IGroupWithAccess[]> {
        return this.fetch({url: `/api/groups/not-accessible/user/${userId}`, method: 'GET'});
    },

    // ===================================================== Groups rights add/remove =========================================================

    removeRights(params: Object): Promise<AxiosResponse<Object>> {
        return this.fetch({url: `/api/group_accesses`, data: params, method: 'DELETE'});
    },

    addRights(params: Object): Promise<AxiosResponse<Object>> {
        return this.fetch({url: `/api/group_accesses`, data: params, method: 'POST'});
    },

    toggleRecursiveRights(params: Object): Promise<AxiosResponse<Object>> {
        return this.fetch({url: `/api/group_accesses/toggle`, data: params, method: 'PUT'});
    },

    // ===================================================== Users =========================================================

    getUsers(): Promise<IUser[]> {
        return this.fetch({url: `/api/users`, method: 'GET'});
    },

    getUser(userId: number): Promise<IUser> {
        return this.fetch({url: `/api/users/${userId}`, method: 'GET'});
    },

    // ===================================================== Roles =========================================================

    addRole(params: Object): Promise<AxiosResponse<Object>> {
        return this.fetch({url: `/api/roles`, data: params,  method: 'POST'});
    },

    removeRole(params: Object): Promise<AxiosResponse<Object>> {
        return this.fetch({url: `/api/roles`, data: params,  method: 'DELETE'});
    },

    // ===================================================== Repositories =========================================================

    fetchRepositories(): Promise<IRepository[]> {
        return this.fetch({url: `/api/vcs/repositories`, method: 'GET'});
    },

    postRepository(params: Object): Promise<ITrackedRepository> {
        return this.fetch({url: `/api/vcs/repositories`, data: params, method: 'POST'});
    },

    // ===================================================== Auth =========================================================

    login(userCredentials: IUserCredentials): Promise<IJsonWebToken> {
        return this.fetch({url: `/api/auth/login`, data: userCredentials, method: 'POST'});
    },

    logins(): Promise<string[]> {
        return this.fetch({url: `/api/auth/login`, method: 'GET'});
    },

    delete_login(login_type: string): Promise<void> {
        return this.fetch({url: `/api/auth/login`, data: {login_type: login_type},  method: 'DELETE'});
    },

    delete_account(): Promise<void> {
        return this.fetch({url: `/api/auth/account`,  method: 'DELETE'});
    },

    register(userCredentials: IUserCredentials): Promise<IJsonWebToken> {
        return this.fetch({url: `/api/auth/register`, data: userCredentials, method: 'POST'});
    },

    fetchToken(): Promise<IJsonWebToken> {
        return this.fetch({url: `/api/auth/token`, method: 'GET'});
    },

    changePassword(params: Object): Promise<void> {
        return this.fetch({url: `/api/auth/password`, data: params, method: 'PUT'});
    },

    createPassword(params: Object): Promise<void> {
        return this.fetch({url: `/api/auth/password-create`, data: params, method: 'PUT'});
    },

    getPassword(): Promise<boolean> {
        return this.fetch({url: `/api/auth/password`, method: 'GET'});
    },
}

export default Api;
