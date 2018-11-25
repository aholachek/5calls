import * as React from 'react';
import { UserState } from '../redux/userState';

const defaultUserState: UserState = {
  idToken: undefined,
  profile: undefined
};

export const userStateContext = React.createContext<UserState>(
  defaultUserState
);
