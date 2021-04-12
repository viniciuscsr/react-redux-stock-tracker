import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Card, CardColumns, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listTransactions,
  deleteTransaction,
} from '../actions/transactionActions';

const StockDetailsScreen = ({ match }) => {
  const { symbol } = match.params;

  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { loading, data, error } = transactionList;

  const transactionDelete = useSelector((state) => state.transactionDelete);
  const { success } = transactionDelete;

  useEffect(() => {
    dispatch(listTransactions(symbol));
  }, [dispatch, symbol, success]);

  const deleteHandler = (transactionId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteTransaction(transactionId));
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {data.id && (
        <>
          <h1 className='text-center'>{data.symbol}</h1>
          <Row className='my-5'>
            <Col>
              <div className='text-center border border-success mx-5 rounded'>
                <p>Price</p>
                <h3>${data.price}</h3>
              </div>
            </Col>
            <Col>
              <div className='text-center border border-success mx-5 rounded'>
                <p>Total Shares</p>
                <h3>{data.totalShares}</h3>
              </div>
            </Col>
          </Row>
          <h2>Transactions</h2>
          {data.transactions.length ? (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr className='table-primary'>
                  <th>Symbol</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.transactions.map((transaction) => (
                  <tr key={transaction.transactionid}>
                    <td>{transaction.symbol}</td>
                    <td>{transaction.shares}</td>
                    <td>{transaction.avg_price}</td>
                    <td>{transaction.type}</td>
                    <td>
                      <LinkContainer
                        to={`/transaction/${transaction.transactionid}/edit`}>
                        <Button variant='warning' className='btn-sm mx-2'>
                          Update
                        </Button>
                      </LinkContainer>

                      <Button
                        onClick={() => deleteHandler(transaction.transactionid)}
                        variant='danger'
                        className='btn-sm'>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Message variant='warning'>
              There are no transactions for this symbol
            </Message>
          )}
          <h2>Related News</h2>
          <CardColumns>
            {data.news.length > 0 ? (
              data.news.slice(0, 6).map((story, index) => (
                <Card key={index} style={{ height: '28rem' }}>
                  <Card.Img
                    variant='top'
                    style={{ maxHeight: '13rem' }}
                    src={story.urlToImage}
                  />
                  <Card.Body>
                    <Card.Title>{story.title}</Card.Title>
                    <Card.Text>
                      {story.content.substring(0, 120) + '...'}
                    </Card.Text>
                    <a href={story.url}>
                      <Button variant='success'>Read More</Button>
                    </a>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>There are no stories for this stock</p>
            )}
          </CardColumns>
        </>
      )}
    </>
  );
};

export default StockDetailsScreen;
