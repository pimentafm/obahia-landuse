# OBahia-webmap
## Territorial and Inteligence Analysis System

## Dependencies

* Mapserver
* php-pdo
* php-pgsql
* yarn 

Create database.ini in the `/obahia-webmap/api` folder with the following:

```ini
host=localhost
port=5432
database=database
user=postgres
password=postgres
```

Create database.map in the `/obahia-webmap/mapfiles/includes` folder with the following:

```
CONNECTIONTYPE postgis
CONNECTION "host=localhost dbname=database user=postgres password=postgres port=5432"
```

See below the folder structure:

```
├── obahia-site             
│   ├── api    
|   |   └── ...
|   |   ├── dbconfig.ini
|   |   ├── ...
|   |   ...
│   ├── mapfiles
|       └── fonts
|       ├── includes
|           └── ...
|           ├── database.ini
|           ...
|       ...
│   ├── public       
│   └── src
│   ...
```

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pimentafm/obahia-webmap?color=%2304D361">

  <a href="https://github.com/pimentafm">
    <img alt="Made by Fernando Pimenta" src="https://img.shields.io/badge/made%20by-Fernando%20Pimenta-%2304D361%22">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>
<hr>

Fernando Pimenta [My Github!](https://github.com/pimentafm)