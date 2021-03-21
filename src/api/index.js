import axios from 'axios';
import {
    BASE_URL,
} from "../constants";

const api = {};
api.fetch = opts => axios
  .request({
    ...opts,
    baseURL: opts.baseURL || BASE_URL,
    mode: 'no-cors'
  })
  .then(response => response.data);

// Timeline
api.getTimeline = params => api.fetch(
    {url: `/api/${params.group}/timeline?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}`, method: 'GET'});
api.getActivityTimeline = params => api.fetch(
    {url: `/api/${params.group}/activity?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}`, method: 'GET'});
api.getSubDirsTimeline = params => api.fetch(
    {url: `/api/${params.group}/subdirs-timeline?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}&depth=${params.dto.depth}`, method: 'GET'});

// Leaderboards
api.getGroupStats = params => api.fetch(
    {url: `/api/groups/${params.group}/stats?start=${params.dto.start}&end=${params.dto.end}&depth=${params.dto.depth}`, method: 'GET'});


// Groups
api.getGroups = () => api.fetch({url: `/api/groups`, method: 'GET'});
api.fetchUserAccessibleGroups = userId => api.fetch({url: `/api/groups/accessible/user/${userId}`, method: 'GET'});
api.fetchUserNotAccessibleGroups = userId => api.fetch({url: `/api/groups/not-accessible/user/${userId}`, method: 'GET'});

// Groups rights add/remove
api.removeRights = params => api.fetch({url: `/api/group_accesses`, data: params, method: 'DELETE'});
api.addRights = params => api.fetch({url: `/api/group_accesses`, data: params, method: 'POST'});
api.toggleRecursiveRights = params => api.fetch({url: `/api/group_accesses/toggle`, data: params, method: 'PUT'});

// Users
api.getUsers = () => api.fetch({url: `/api/users`, method: 'GET'});
api.getUser = id => api.fetch({url: `/api/users/${id}`, method: 'GET'});

// Roles
api.addRole = params => api.fetch({url: `/api/roles`, data: params,  method: 'POST'});
api.removeRole = params => api.fetch({url: `/api/roles`, data: params,  method: 'DELETE'});

// Repositories
api.fetchRepositories = () => api.fetch({url: `/api/vcs/repositories`, method: 'GET'})

// Auth
api.login = params => api.fetch({url: `/api/auth/login`, data: params, method: 'POST'});
api.logins = () => api.fetch({url: `/api/auth/login`, method: 'GET'});
api.delete_login = params => api.fetch({url: `/api/auth/login`, data: params,  method: 'DELETE'});
api.delete_account = () => api.fetch({url: `/api/auth/account`,  method: 'DELETE'});
api.register = params => api.fetch({url: `/api/auth/register`, data: params, method: 'POST'});
api.fetchToken = () => api.fetch({url: `/api/auth/token`, method: 'GET'});
api.changePassword = params => api.fetch({url: `/api/auth/password`, data: params, method: 'PUT'});
api.createPassword = params => api.fetch({url: `/api/auth/password-create`, data: params, method: 'PUT'});
api.getPassword = () => api.fetch({url: `/api/auth/password`, method: 'GET'});


export default api;
