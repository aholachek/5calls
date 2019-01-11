import * as React from 'react';
import { RemoteDataState } from '../redux/remoteData';
import { ContactList } from '../common/models';

const defaultRemoteState = {
  issues: [],
  inactiveIssues: [],
  contacts: new ContactList(),
  callTotal: 0,
  errorMessage: ''
};

export const remoteStateContext = React.createContext<RemoteDataState>(
  defaultRemoteState
);
