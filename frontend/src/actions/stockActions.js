import axios from 'axios';
import {
  STOCK_TRANSACTION_CREATE_REQUEST,
  STOCK_TRANSACTION_CREATE_SUCCESS,
  STOCK_TRANSACTION_CREATE_FAIL,
  STOCK_PORTIFOLIO_REQUEST,
  STOCK_PORTIFOLIO_SUCCESS,
  STOCK_PORTIFOLIO_FAIL,
} from '../constants/stockConstants';

export const createStockTransaction = (transaction) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: STOCK_TRANSACTION_CREATE_REQUEST });

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

    dispatch({ type: STOCK_TRANSACTION_CREATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: STOCK_TRANSACTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPortifolio = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STOCK_PORTIFOLIO_REQUEST });

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

    dispatch({ type: STOCK_PORTIFOLIO_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: STOCK_PORTIFOLIO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
