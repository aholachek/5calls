import * as React from 'react';
import { LocationState } from '../redux/location';

const defaultLocationState: LocationState = {
  address: '',
  cachedCity: '',
  splitDistrict: false,
  invalidAddress: false,
  locationFetchType: undefined
};

export const locationStateContext = React.createContext<LocationState>(
  defaultLocationState
);
