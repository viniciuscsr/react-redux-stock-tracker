import {
  STOCK_TRANSACTION_CREATE_REQUEST,
  STOCK_TRANSACTION_CREATE_SUCCESS,
  STOCK_TRANSACTION_CREATE_FAIL,
  STOCK_TRANSACTION_CREATE_RESET,
} from '../constants/stockConstants';

export const stockTransactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case STOCK_TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case STOCK_TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
