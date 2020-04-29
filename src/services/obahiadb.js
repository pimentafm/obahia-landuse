import axios from 'axios';

const oba = axios.create({
    baseURL:`http://obahia.dea.ufv.br`
});

export default oba;