import {
  applyMiddleware,
  createStore,
  Store,
  compose,
  Middleware
} from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import rootReducer, { ApplicationState, DefaultApplicationState } from './root';
import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];

export let persistor = {} as Persistor;
export let store = {} as Store<ApplicationState>;

// @ts-ignore
const preloadedState = window.__PRELOADED_STATE__;
// @ts-ignore
delete window.__PRELOADED_STATE__;
// @ts-ignore
window.snapSaveState = () => ({
  __PRELOADED_STATE__: store.getState()
});

export default initialState => {
  store = createStore(
    rootReducer,
    preloadedState || DefaultApplicationState,
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

  return store;
};
