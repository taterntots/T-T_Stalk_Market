import { combineReducers } from 'redux';

//local imports
import authReducer from '../reducers/authReducer';
import turnipReducer from '../reducers/turnipReducer';

// combineReducers is a function from redux that joins all of our reducers together
export const rootReducer = combineReducers({
  auth: authReducer,
  turnip: turnipReducer
});