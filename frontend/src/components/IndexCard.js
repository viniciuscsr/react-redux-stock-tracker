import React from 'react';
import { Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const IndexCard = ({ symbol, price, nominalVariation }) => {
  return (
    <Col xs={12} md={6} lg={3} className='index-card-col'>
      <div className='index-card'>
        <LinkContainer to='/'>
          <a href='/' className='symbol-link'>
            {symbol}
          </a>
        </LinkContainer>
        <div>
          <h5 className='mx-2'>{price}</h5>
          <h5 className='mx-2'>
            {nominalVariation > 0 ? (
              <span className='positive-performance'>
                {'+' + nominalVariation} <i className='fas fa-caret-up'></i>
              </span>
            ) : (
              <span className='negative-performance'>
                {nominalVariation} <i className='fas fa-caret-down'></i>{' '}
              </span>
            )}
          </h5>
        </div>
      </div>
    </Col>
  );
};

export default IndexCard;
