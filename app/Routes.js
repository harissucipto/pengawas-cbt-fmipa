import React from 'react';
import { Switch, Route } from 'react-router';
import { Row, Col, Layout } from 'antd';

import Header from './components/Header';
import Navigasi from './components/Navigasi';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import InfoPage from './containers/InfoPage';
import PinPage from './containers/PinPage';
import HadirPage from './containers/KehadiranPage';
import BeritaPage from './containers/BeritaPage';
import ResetPage from './containers/ResetPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.RESET} component={ResetPage} />
      <Route path={routes.BERITA} component={BeritaPage} />
      <Route path={routes.HADIR} component={HadirPage} />
      <Route path={routes.PIN} component={PinPage} />
      <Route path={routes.INFO} component={InfoPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
