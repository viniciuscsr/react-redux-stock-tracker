import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import IndexCard from '../components/IndexCard';
import { CardGroup, Card, Carousel, Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchArticles = async () => {
      setLoading(true);
      try {
        setError(false);
        const response = await axios.get(`/api/stocks/top-headlines`);
        if (!ignore) setArticles(response.data);
      } catch (err) {
        setError('Something went wrong');
      }
      setLoading(false);
    };
    fetchArticles();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Row className='my-3'>
        <IndexCard symbol='S&P 500' price='4128.80' nominalVariation='31.63' />
        <IndexCard symbol='S&P 500' price='4128.80' nominalVariation='31.63' />
        <IndexCard symbol='S&P 500' price='4128.80' nominalVariation='31.63' />
        <IndexCard symbol='S&P 500' price='4128.80' nominalVariation='31.63' />
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

          <CardGroup>
            {articles.slice(3, 6).map((article, index) => {
              return (
                <Card>
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
