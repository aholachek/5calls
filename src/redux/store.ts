import {
  applyMiddleware,
  createStore,
  Store,
  compose,
  Middleware
} from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import rootReducer, { ApplicationState } from './root';
import thunk from 'redux-thunk';

const middlewares: Middleware[] = [thunk];

export let persistor = {} as Persistor;
export let store = {} as Store<ApplicationState>;

export default initialState => {
  store = createStore(
    rootReducer,
    initialState,
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
