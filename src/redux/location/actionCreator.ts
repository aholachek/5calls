import {
  LocationClearedAction,
  LocationSetAction,
  LocationActionType,
  SetLocationFetchTypeAction,
  SetSplitDistrictAction
} from './index';
import { LocationFetchType } from '../../common/models';
import { SetInvalidAddressAction } from './action';

export function setLocation(address: string): LocationSetAction {
  return {
    type: LocationActionType.LOCATION_SET,
    payload: address
  };
}

export function clearAddress(): LocationClearedAction {
  return {
    type: LocationActionType.LOCATION_CLEAR
  };
}

export function setCachedCity(city: string | undefined) {
  return {
    type: LocationActionType.CACHE_CITY,
    payload: city
  };
}

export function setLocationFetchType(
  fetchType: LocationFetchType
): SetLocationFetchTypeAction {
  return {
    type: LocationActionType.SET_LOCATION_FETCH_TYPE,
    payload: fetchType
  };
}

export function setSplitDistrict(
  isDistrictSplit: boolean
): SetSplitDistrictAction {
  return {
    type: LocationActionType.SET_SPLIT_DISTRICT,
    payload: isDistrictSplit
  };
}

export function setInvalidAddress(
  invalidAddress: boolean
): SetInvalidAddressAction {
  return {
    type: LocationActionType.SET_INVALID_ADDRESS,
    payload: invalidAddress
  };
}
