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

api.getTimeline = params => api.fetch(
    {url: `/api/test_group/timeline?start=${params.start}&end=${params.end}&interval=${params.interval}&timezone=${params.timezone}`, method: 'GET'});
api.getGroups = () => api.fetch({url: `/api/groups`, method: 'GET'});

export default api;
