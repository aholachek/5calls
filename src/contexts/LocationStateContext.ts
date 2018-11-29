import * as React from 'react';
import { LocationState } from '../redux/location';
import { LocationUiState } from '../common/model';

const defaultLocationState: LocationState = {
  address: '',
  cachedCity: '',
  splitDistrict: false,
  invalidAddress: false,
  uiState: LocationUiState.FETCHING_LOCATION,
  locationFetchType: undefined
};

export const locationStateContext = React.createContext<LocationState>(
  defaultLocationState
);
