import {
  STOCK_TRANSACTION_CREATE_REQUEST,
  STOCK_TRANSACTION_CREATE_SUCCESS,
  STOCK_TRANSACTION_CREATE_FAIL,
  STOCK_TRANSACTION_CREATE_RESET,
  STOCK_PORTIFOLIO_REQUEST,
  STOCK_PORTIFOLIO_SUCCESS,
  STOCK_PORTIFOLIO_FAIL,
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

export const stockPortifolioReducer = (state = { portifolio: [] }, action) => {
  switch (action.type) {
    case STOCK_PORTIFOLIO_REQUEST:
      return { loading: true };
    case STOCK_PORTIFOLIO_SUCCESS:
      return { loading: false, portifolio: action.payload };
    case STOCK_PORTIFOLIO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
