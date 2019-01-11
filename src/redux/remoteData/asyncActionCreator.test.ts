import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as moxios from 'moxios';

import { RemoteDataActionType } from './action';
import { fetchCallCount } from './index';
import { ApplicationState } from './../root';
import { Issue } from './../../common/models';
import { IssueData } from '../../common/models/model';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

// Not sure how to test this: getAllIssues uses a non-mocked `store` to fill in the header details automatically
// test('getApiData() action creator functions correctly', () => {
//   const issueName = 'Issue';
//   const apiData: IssueData = getApiDataResponse(issueName);
//   moxios.stubRequest(`${Constants.ISSUES_API_URL}`, { response: apiData });

//   const initialState = {} as ApplicationState;
//   const locationState = {
//     address: '',
//     cachedCity: '',
//     splitDistrict: false,
//     invalidAddress: false,
//     locationFetchType: LocationFetchType.CACHED_ADDRESS
//   };
//   initialState.locationState = locationState;
//   const store = mockStore(initialState);
//   // tslint:disable-next-line:no-any
//   store.dispatch<any>(getAllIssues()).then(() => {
//     const actions = store.getActions();
//     // console.log('Actions', actions);
//     expect(actions[4].payload[0].name).toEqual(issueName);
//   });
// });

// const getApiDataResponse = (issueName): IssueData => {
//   const mockIssue = Object.assign({}, new Issue(), { name: issueName });

//   const mockResponse: IssueData = {
//     issues: [mockIssue]
//   };
//   return mockResponse;
// };

test('fetchCallCount() action creator dispatches proper action', () => {
  const count = 999999;
  const expectedType = RemoteDataActionType.GET_CALL_TOTAL;
  moxios.stubRequest(/counts/, { response: { count } });
  const initialState = {} as ApplicationState;
  const store = mockStore(initialState);
  fetchCallCount().then(() => {
    const actions = store.getActions();
    expect(actions[0].type).toEqual(expectedType);
    expect(actions[0].payload).toEqual(count);
  });
});
