import {
  applyMiddleware,
  createStore,
  Store,
  compose,
  Middleware
} from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import rootReducer, { ApplicationState, DefaultApplicationState } from './root';
import { Issue } from '../common/models/issue';

import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];

export let persistor = {} as Persistor;
export let store = {} as Store<ApplicationState>;

export default () => {
  // @ts-ignore
  const preloadedState = window.__PRELOADED_STATE__;
  // @ts-ignore
  delete window.__PRELOADED_STATE__;

  let partiallyHydratedDefaultState = DefaultApplicationState;

  if (preloadedState && preloadedState.remoteDataState) {
    // only hydrate  the remotedatastore (for better transition from server rendered page)
    // we have to re-instantiate the Issue objects before
    // putting them in the store
    // (this is kind of a workaround bc we store nonserializable state in redux)
    const hydratedRemoteDataState = {
      ...preloadedState.remoteDataState,
      issues: preloadedState.remoteDataState.issues.map(issue =>
        Object.assign(new Issue(), issue)
      ),
      inactiveIssues: preloadedState.remoteDataState.inactiveIssues.map(issue =>
        Object.assign(new Issue(), issue)
      )
    };

    partiallyHydratedDefaultState = {
      ...DefaultApplicationState,
      remoteDataState: hydratedRemoteDataState
    };
  }

  store = createStore(
    rootReducer,
    partiallyHydratedDefaultState,
    compose(
      applyMiddleware(...middlewares),
      // This added for Redux Dev Tools - install Chrome or Firefox extension to use
      typeof window === 'object' &&
        // tslint:disable-next-line: no-string-literal
        typeof window['devToolsExtension'] !== 'undefined'
        ? // tslint:disable-next-line: no-string-literal
          window['devToolsExtension']()
        : f => f
    )
  ) as Store<ApplicationState>;

  persistor = persistStore(store);

  // @ts-ignore
  window.snapSaveState = () => ({
    __PRELOADED_STATE__: store.getState()
  });

  return store;
};
