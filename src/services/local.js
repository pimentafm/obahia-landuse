import axios from 'axios';

const ucayali = axios.create({
    baseURL:`http://localhost`
});

export default ucayali;