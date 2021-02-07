import axios from 'axios';
import {
  baseURL,
} from "../constants";

const api = {};
api.fetch = opts => axios
  .request({
    ...opts,
    baseURL: opts.baseURL || baseURL,
    mode: 'no-cors'
  })
  .then(response => response.data);

// Timeline
api.getTimeline = params => api.fetch(
    {url: `/api/test_group/timeline?start=${params.start}&end=${params.end}&interval=${params.interval}&timezone=${params.timezone}`, method: 'GET'});

// Groups
api.getGroups = () => api.fetch({url: `/api/groups`, method: 'GET'});

// Users
api.getUsers = () => api.fetch({url: `/api/users`, method: 'GET'});
api.getUser = id => api.fetch({url: `/api/users/${id}`, method: 'GET'});

// Roles
api.addRole = params => api.fetch({url: `/api/roles`, data: params,  method: 'POST'});
api.removeRole = params => api.fetch({url: `/api/roles`, data: params,  method: 'DELETE'});

// Auth
api.login = params => api.fetch({url: `/api/auth/login`, data: params, method: 'POST'});
api.register = params => api.fetch({url: `/api/auth/register`, data: params, method: 'POST'});
api.fetchToken = () => api.fetch({url: `/api/auth/token`, method: 'GET'});
api.changePassword = params => api.fetch({url: `/api/auth/password`, data: params, method: 'PUT'});

export default api;
