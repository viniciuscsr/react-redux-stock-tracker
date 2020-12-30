import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateTransaction,
  detailTransaction,
} from '../actions/transactionActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { TRANSACTION_UPDATE_RESET } from '../constants/transactionConstants';

const UpdateTransactionScreen = ({ history, match }) => {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const { transactionId } = match.params;

  const transactionUpdate = useSelector((state) => state.transactionUpdate);
  const { loading, success, error } = transactionUpdate;

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const {
    loading: loadingDetails,
    transaction,
    error: errorDetails,
  } = transactionDetails;

  useEffect(() => {
    if (success) {
      dispatch({ type: TRANSACTION_UPDATE_RESET });
      history.push(`/stocks/${transaction.symbol}`);
    } else {
      if (!transaction.symbol) {
        dispatch(detailTransaction(transactionId));
        console.log(transaction.symbol);
      } else {
        setSymbol(transaction.symbol);
        setShares(transaction.shares);
        setAvgPrice(transaction.avg_price);
        setType(transaction.type);
      }
    }
  }, [success, history, dispatch, transaction, transactionId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTransaction(transactionId, { shares, avgPrice, type }));
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Create New Transaction</h1>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          {errorDetails && <Message>{errorDetails}</Message>}
          {loadingDetails && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='symbol'>
              <Form.Label>Symbol</Form.Label>
              <Form.Control
                type='text'
                disabled
                placeholder='Stock Symbol'
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='shares'>
              <Form.Label>Enter the Number of Shares </Form.Label>
              <Form.Control
                type='number'
                placeholder='Number of Shares'
                value={shares}
                onChange={(e) => setShares(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='avgPrice'>
              <Form.Label>Enter the Average Share Price </Form.Label>
              <Form.Control
                type='number'
                placeholder='Average Price'
                value={avgPrice}
                onChange={(e) => setAvgPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <div className='mb-3'>
              <Form.Label className='mr-2'>Type of Operation: </Form.Label>
              <Form.Check
                inline
                label='Buy'
                name='type'
                type='radio'
                id='inline-radio-buy'
                onChange={(e) => {
                  setType('buy');
                }}
              />
              <Form.Check
                inline
                label='Sell'
                name='type'
                type='radio'
                id='inline-radio-sell'
                onChange={(e) => {
                  setType('sell');
                }}
              />
            </div>
            <Button type='submit' variant='primary'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTransactionScreen;
