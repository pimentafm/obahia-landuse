import axios from 'axios';

const ucayali = axios.create({
    baseURL:`http://ucayali.dea.ufv.br`
});

export default ucayali;