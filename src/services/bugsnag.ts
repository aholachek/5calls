import * as React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

let bugsnagClient;
// hi this is really bad but I can't figure out how to mock this everywhere otherwise
if (process.env.JEST_WORKER_ID) {
  bugsnagClient = {};
} else {
  bugsnagClient = bugsnag({
    apiKey: '67e3931dbe1bbf48991ce7d682ceb676',
    notifyReleaseStages: ['production']
  });
  bugsnagClient.use(bugsnagReact, React);
}

export default bugsnagClient;
