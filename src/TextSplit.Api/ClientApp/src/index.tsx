import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import App from './components/app';
import './index.scss';

import 'react-block-ui/style.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render((
  <BrowserRouter basename={baseUrl || undefined}>
    <Switch>
      <Route path='/' component={App} />
    </Switch>
  </BrowserRouter>


), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
