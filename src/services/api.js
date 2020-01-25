import axios from 'axios';

const oba = axios.create({
    baseURL:`http://corrente.dea.ufv.br`
});

export default oba;