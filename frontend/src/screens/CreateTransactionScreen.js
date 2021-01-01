import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../actions/transactionActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { TRANSACTION_CREATE_RESET } from '../constants/transactionConstants';

const CreateTransactionScreen = ({ history }) => {
  const [symbol, setSymbol] = useState('');
  const [shares, setShares] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [type, setType] = useState('');

  const dispatch = useDispatch();

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const { loading, success, error } = transactionCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: TRANSACTION_CREATE_RESET });
      history.push(`/stock/${symbol}`);
    }
  }, [success, history, dispatch, symbol]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTransaction({ symbol, shares, avgPrice, type }));
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Create New Transaction</h1>
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='symbol'>
              <Form.Label>Symbol</Form.Label>
              <Form.Control
                type='text'
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

export default CreateTransactionScreen;
