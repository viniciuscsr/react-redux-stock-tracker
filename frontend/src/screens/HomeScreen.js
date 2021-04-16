import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import IndexCard from '../components/IndexCard';
import { CardGroup, Card, Carousel, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import useRequest from '../hooks/useRequest';

const HomeScreen = () => {
  // const [marketSummary, setMarketSummary] = useState([]);
  // const [marketLoading, setMarketLoading] = useState(false);
  // const [marketError, setMarketError] = useState(false);

  const { data: articles, loading, error } = useRequest(
    '/api/stocks/top-headlines'
  );

  const {
    data: marketSummary,
    loading: marketLoading,
    error: marketError,
  } = useRequest('/api/stocks/market-summary');

  return (
    <>
      <Row className='mb-3'>
        {marketLoading && <Loader />}
        {marketError && <Message>{error}</Message>}
        {marketSummary.length > 0 && (
          <>
            {marketSummary.slice(0, 4).map((stock, index) => {
              return (
                <IndexCard
                  key={index}
                  symbol={stock.symbol}
                  price={stock.price.toFixed(2)}
                  nominalVariation={stock.nominalPriceVariation.toFixed(2)}
                  percentagePriceVariation={stock.percentagePriceVariation.toFixed(
                    2
                  )}
                />
              );
            })}
          </>
        )}
      </Row>

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {articles.length > 0 && (
        <>
          <Carousel className='carousel mb-3'>
            {articles.slice(0, 3).map((article, index) => {
              return (
                <Carousel.Item key={index} className='carousel-item'>
                  <div className='image-wrapper'>
                    <div className='img-overlay'></div>
                    <img
                      className='d-block w-100 carousel-image img-fluid'
                      src={article.urlToImage}
                      alt='First slide'
                    />
                  </div>
                  <Carousel.Caption className='carousel-caption'>
                    <a href={article.url} target='_blank' rel='noreferrer'>
                      <h3>{article.title}</h3>
                    </a>
                    <p>{article.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
          <div className='get-started-header py-5 '>
            <h1 className='py-4'>The best way to track stocks</h1>
            <LinkContainer to='/signup'>
              <Button variant='success' size='lg'>
                Get Started
              </Button>
            </LinkContainer>
          </div>
          <CardGroup>
            {articles.slice(3, 6).map((article, index) => {
              return (
                <Card key={index}>
                  <Card.Img
                    variant='top'
                    src={article.urlToImage}
                    style={{ maxHeight: '14rem' }}
                  />
                  <Card.Body>
                    <a href={article.url} target='_blank' rel='noreferrer'>
                      <Card.Title>{article.title}</Card.Title>
                    </a>
                    <Card.Text>{article.description}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardGroup>
        </>
      )}
    </>
  );
};

export default HomeScreen;
