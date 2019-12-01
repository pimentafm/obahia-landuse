import axios from 'axios';

const api = axios.create({
    baseURL:`http://corrente.dea.ufv.br`
});

export default api;