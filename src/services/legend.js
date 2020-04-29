import axios from 'axios';

const lgd = axios.create({
    baseURL:`http://obahia.dea.ufv.br:8085`
});

export default lgd;