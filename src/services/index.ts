import axios from 'axios';

export const oba = axios.create({
  baseURL: `http://obahia.dea.ufv.br`,
});

export const wms = axios.create({
  baseURL: `http://obahia.dea.ufv.br:8085/cgi-bin/mapserv.fcgi?map=/var/www/geodb/mapfiles/`,
});
