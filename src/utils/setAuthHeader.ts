import axios from 'axios';

export default (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
