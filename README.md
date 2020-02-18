# OBahia-webmap
## Territorial and Inteligence Analysis System

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/pimentafm/obahia-webmap?color=blue">

  <a href="https://github.com/pimentafm">
    <img alt="Made by Fernando Pimenta" src="https://img.shields.io/badge/made%20by-Fernando%20Pimenta-blue">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

![alt text](/public/app.png)

## Dependencies:
[![made-with-Nodejs](https://img.shields.io/badge/Nodejs-green.svg)](https://nodejs.org/)
[![made-with-Yarn](https://img.shields.io/badge/Yarn-2188b6.svg)](https://yarnpkg.com/)
[![made-with-React](https://img.shields.io/badge/React-61dafb.svg)](https://https://reactjs.org/)
[![made-with-Mapserver](https://img.shields.io/badge/Mapserver-33a333.svg)](https://mapserver.org/)
[![made-with-PHP](https://img.shields.io/badge/PHP-purple.svg)](https://www.php.net/)
[![made-with-PostgreSQL](https://img.shields.io/badge/PostgreSQL-33658f.svg)](https://www.postgresql.org/)
[![made-with-PostGIS](https://img.shields.io/badge/PostGIS-5a7a9f.svg)](https://postgis.net/)

*nodejs dependencies can be found in `package.json`.

Set dbconfig.ini in the `/obahia-webmap/api` folder:

```ini
host=localhost
port=5432
database=database
user=postgres
password=postgres
```

Set dbconfig.map in the `/obahia-webmap/mapfiles/includes` folder:

```
CONNECTIONTYPE postgis
CONNECTION "host=localhost dbname=database user=postgres password=postgres port=5432"
```

See below the project folder structure:

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
|           ├── dbconfig.map
|           ...
|       ...
│   ├── public       
│   └── src
│   ...
```

Run `yarn start` to develop the app.

Run `yarn build` to deploy the app.

<hr>

## Build App using BrowserRouter in an Apache server:

In `package.json` set the proxy and homepage with the `<app-folder-name>`:

```json
{
  ...
  "homepage": "http://localhost/<app-folder-name>",
  "proxy": "http://localhost:80",
  ...
}
```

Add the basename in your BrowserRouter component:

```jsx

<!-- A Code Snippet example -->
import React from 'react';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Header from './components/Header';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter basename="/<app-folder-name>">
    <Header />
    <Routes />
    <GlobalStyle />
    <ToastContainer className="toast-class" />
    </BrowserRouter>
  );
}

export default App;
```

Add the `.htaccess` into public folder or directly into your `<app-folder-name>` folder:

```apache
<IfModule mod_rewrite.c>
  Options -MultiViews
	RewriteEngine On
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^ index.html [QSA,L]
</IfModule>
```
<hr>

Fernando Pimenta [My Github!](https://github.com/pimentafm)
