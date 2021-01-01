import React from 'react';
import { Jumbotron, Container, CardGroup, Card } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 className=''>Stock Tracker</h1>
          <p>
            Track your personal stock portfolios and automatically determine
            your costs and total gains.
          </p>
        </Container>
      </Jumbotron>
      <CardGroup>
        <Card>
          <Card.Img
            variant='top'
            src='/images/dashboard.jpg'
            style={{ maxHeight: '14rem' }}
          />
          <Card.Body>
            <Card.Title>Portifolio Dashboard</Card.Title>
            <Card.Text>Track your personal stock portfolios.</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant='top'
            src='/images/stock_price.jpg'
            style={{ maxHeight: '14rem' }}
          />
          <Card.Body>
            <Card.Title>Stock Prices</Card.Title>
            <Card.Text>
              View closing prices of the stocks in your portifolio.{' '}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img
            variant='top'
            src='/images/stock_news.jpg'
            style={{ maxHeight: '14rem' }}
          />
          <Card.Body>
            <Card.Title>Stock News</Card.Title>
            <Card.Text>
              Stock Tracer provides the latest stock market, financial and
              business news.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};

export default HomeScreen;
