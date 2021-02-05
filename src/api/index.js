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
    {url: `/api/${params.group}/timeline?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}`, method: 'GET'});
api.getActivityTimeline = params => api.fetch(
    {url: `/api/${params.group}/activity?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}`, method: 'GET'});
api.getSubdirsTimeline = params => api.fetch(
    {url: `/api/${params.group}/subdirs-timeline?start=${params.dto.start}&end=${params.dto.end}&interval=${params.dto.interval}&timezone=${params.dto.timezone}&depth=${params.dto.depth}`, method: 'GET'});


// Groups
api.getGroups = () => api.fetch({url: `/api/groups`, method: 'GET'});

// Users
api.getUsers = () => api.fetch({url: `/api/users`, method: 'GET'});

// Roles
api.addRole = params => api.fetch({url: `/api/roles`, data: params,  method: 'POST'});

// Auth
api.login = params => api.fetch({url: `/api/auth/login`, data: params, method: 'POST'});
api.register = params => api.fetch({url: `/api/auth/register`, data: params, method: 'POST'});
api.fetchToken = () => api.fetch({url: `/api/auth/token`, method: 'GET'});

export default api;
