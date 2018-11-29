import * as React from 'react';
import { UserStatsState } from '../redux/userStats';

const defaultUserStats = {
  all: [],
  unavailable: 0,
  voicemail: 0,
  contact: 0
};

export const userStatsContext = React.createContext<UserStatsState>(
  defaultUserStats
);
