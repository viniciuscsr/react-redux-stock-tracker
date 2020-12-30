import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_CREATE_RESET,
  TRANSACTION_PORTIFOLIO_REQUEST,
  TRANSACTION_PORTIFOLIO_SUCCESS,
  TRANSACTION_PORTIFOLIO_FAIL,
  TRANSACTION_UPDATE_REQUEST,
  TRANSACTION_UPDATE_SUCCESS,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_DELETE_REQUEST,
  TRANSACTION_DELETE_SUCCESS,
  TRANSACTION_DELETE_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_UPDATE_RESET,
} from '../constants/transactionConstants';

export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionPortifolioReducer = (
  state = { portifolio: [] },
  action
) => {
  switch (action.type) {
    case TRANSACTION_PORTIFOLIO_REQUEST:
      return { loading: true };
    case TRANSACTION_PORTIFOLIO_SUCCESS:
      return { loading: false, portifolio: action.payload };
    case TRANSACTION_PORTIFOLIO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_UPDATE_REQUEST:
      return { loading: true };
    case TRANSACTION_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DELETE_REQUEST:
      return { loading: true };
    case TRANSACTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const transactionDetailsReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, transaction: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
