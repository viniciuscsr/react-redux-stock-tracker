import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getPortifolio } from '../actions/transactionActions';

const PortifolioScreen = () => {
  const dispatch = useDispatch();

  const transactionPortifolio = useSelector(
    (state) => state.transactionPortifolio
  );
  const { loading, portifolio, error } = transactionPortifolio;

  useEffect(() => {
    dispatch(getPortifolio());
  }, [dispatch]);

  return (
    <>
      <h1>Portifolio</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Total Shares</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {portifolio.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.totalShares}</td>
                <td>{stock.price}</td>
                <td>
                  <LinkContainer to={`/stock/${stock.symbol}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PortifolioScreen;
