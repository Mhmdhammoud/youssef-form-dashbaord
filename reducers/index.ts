import authReducers from './authReducer';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  auth: authReducers,
});

const persistConfig = {
  keyPrefix: 'youssef-form-dashboard-',
  key: 'RootReducer',
  storage,
};
export type AppState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
