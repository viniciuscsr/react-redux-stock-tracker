import axios from 'axios';
import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
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
  TRANSACTION_LIST_REQUEST,
  TRANSACTION_LIST_SUCCESS,
  TRANSACTION_LIST_FAIL,
} from '../constants/transactionConstants';

export const createTransaction = (transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TRANSACTION_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post('/api/stocks', transaction, config);

    dispatch({ type: TRANSACTION_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TRANSACTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPortifolio = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_PORTIFOLIO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/stocks', config);

    dispatch({ type: TRANSACTION_PORTIFOLIO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_PORTIFOLIO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTransaction = (transactionId, transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TRANSACTION_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `/api/stocks/transactions/${transactionId}`,
      transaction,
      config
    );

    dispatch({ type: TRANSACTION_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TRANSACTION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTransaction = (transactionId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TRANSACTION_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/stocks/transactions/${transactionId}`, config);

    dispatch({ type: TRANSACTION_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailTransaction = (transactionId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/stocks/transactions/${transactionId}`,
      config
    );

    dispatch({ type: TRANSACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTransactions = (symbol) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/stocks/${symbol}`, config);

    dispatch({ type: TRANSACTION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
