// import bugsnag from 'bugsnag-js';
// import createPlugin from 'bugsnag-react';

import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import './index.css';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
// import { BUGSNAG_KEY } from './constants/appConstants';

// const bugsnagClient = bugsnag(BUGSNAG_KEY);
// const ErrorBoundary = bugsnagClient.use(createPlugin(React));


WebFont.load({
  google: {
    families: ['Ubuntu', 'sans-serif'],
  },
});

ReactDOM.render(
  // <ErrorBoundary>
  <App />
  // </ErrorBoundary>
  , document.getElementById('root'),
);
// registerServiceWorker();
unregister();

// export default bugsnagClient;
