import React from 'react';
import ReactDOM from 'react-dom';
import {Normalize} from 'styled-normalize';
import './index.less';

import App from './App';
// import environment from './config/environment';
import reportWebVitals from './reportWebVitals';

// const {appVersion, envName, sentryDsn, isProduction} = environment;

ReactDOM.render(
  <>
    <Normalize />
    <App />
  </>,
  document.getElementById('root')
);

reportWebVitals();
