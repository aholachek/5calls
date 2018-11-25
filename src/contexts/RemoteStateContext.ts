import * as React from 'react';
import { RemoteDataState } from '../redux/remoteData';

const defaultDonation = {
  count: 0,
  amount: 0,
  total: 0,
  kind: ''
};

const defaultRemoteState = {
  issues: [],
  inactiveIssues: [],
  callTotal: 0,
  donations: defaultDonation,
  errorMessage: ''
};

export const remoteStateContext = React.createContext<RemoteDataState>(
  defaultRemoteState
);
