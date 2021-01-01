import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userSignUpReducer } from './reducers/userReducers';
import {
  transactionCreateReducer,
  transactionPortifolioReducer,
  transactionUpdateReducer,
  transactionDeleteReducer,
  transactionDetailsReducer,
  transactionListReducer,
} from './reducers/transactionReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  transactionCreate: transactionCreateReducer,
  transactionPortifolio: transactionPortifolioReducer,
  transactionUpdate: transactionUpdateReducer,
  transactionDelete: transactionDeleteReducer,
  transactionDetails: transactionDetailsReducer,
  transactionList: transactionListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
