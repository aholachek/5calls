import * as React from 'react';
import { shallow } from 'enzyme';
import i18n from '../../services/i18n';
import { Location } from './index';
import { LocationState } from '../../redux/location';
import { LocationFetchType, LocationUiState } from '../../common/model';

test('Location component should show location prop value if locationState.address is defined', () => {
  const locationState: LocationState = {
    address: '1234',
    cachedCity: '',
    splitDistrict: false,
    invalidAddress: false,
    uiState: LocationUiState.LOCATION_FOUND,
    locationFetchType: LocationFetchType.BROWSER_GEOLOCATION
  };

  const component = shallow(
    <Location t={i18n.t} locationState={locationState} />
  );
  const node = component.find('#locationMessage span');
  expect(node.text()).toEqual(locationState.address);
});

test('Location component should show location prop value if locationState.cachedCity is defined', () => {
  const locationState: LocationState = {
    address: '',
    cachedCity: 'Cached Address',
    splitDistrict: false,
    invalidAddress: false,
    uiState: LocationUiState.LOCATION_FOUND,
    locationFetchType: LocationFetchType.BROWSER_GEOLOCATION
  };

  const component = shallow(
    <Location t={i18n.t} locationState={locationState} />
  );
  const node = component.find('#locationMessage span');
  expect(node.text()).toEqual(locationState.cachedCity);
});

test('Should show "Getting your location" label if fetching location', () => {
  const locationState: LocationState = {
    address: '1234',
    cachedCity: '',
    splitDistrict: false,
    invalidAddress: false,
    uiState: LocationUiState.FETCHING_LOCATION,
    locationFetchType: LocationFetchType.CACHED_ADDRESS
  };

  const component = shallow(
    <Location locationState={locationState} t={i18n.t} />
  );
  const label = component.find('p.loadingAnimation').first();
  expect(label).toBeDefined();
});

test('If address is invalid, show proper message and form with input and "Go" button', () => {
  const locationState: LocationState = {
    address: 'Foobar USA',
    cachedCity: '',
    splitDistrict: false,
    invalidAddress: false,
    uiState: LocationUiState.LOCATION_ERROR,
    locationFetchType: LocationFetchType.CACHED_ADDRESS
  };

  const component = shallow(
    <Location locationState={locationState} t={i18n.t} />
  );
  const label = component.find('p[role="alert"]');
  expect(label).toBeDefined();
  const input = component.find('form input');
  expect(input).toBeDefined();
  const button = component.find('form button');
  expect(button).toBeDefined();
});
