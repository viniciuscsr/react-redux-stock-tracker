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

  const sp500NominalVariation = 31.63;
  const spPrice = 4128.8;

  return (
    <>
      <Row className='my-3'>
        <IndexCard
          symbol='S&P 500'
          price={spPrice}
          nominalVariation={sp500NominalVariation}
        />
        <IndexCard
          symbol='S&P 500'
          price={spPrice}
          nominalVariation={sp500NominalVariation}
        />
        <IndexCard
          symbol='S&P 500'
          price={spPrice}
          nominalVariation={sp500NominalVariation}
        />
        <IndexCard
          symbol='S&P 500'
          price={spPrice}
          nominalVariation={sp500NominalVariation}
        />
      </Row>

      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {articles.length > 0 && (
        <>
          <Carousel className='carousel'>
            <Carousel.Item>
              <img
                className='d-block w-100 carousel-image img-fluid'
                src={articles[0].urlToImage}
                alt='First slide'
              />
              <Carousel.Caption>
                <a href={articles[0].url} target='_blank' rel='noreferrer'>
                  <h3>{articles[0].title}</h3>
                </a>
                <p>{articles[0].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100 carousel-image img-fluid'
                src={articles[1].urlToImage}
                alt='First slide'
              />
              <Carousel.Caption>
                <a href={articles[1].url} target='_blank' rel='noreferrer'>
                  <h3>{articles[1].title}</h3>
                </a>
                <p>{articles[1].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100 carousel-image img-fluid'
                src={articles[2].urlToImage}
                alt='First slide'
              />
              <Carousel.Caption>
                <a href={articles[2].url} target='_blank' rel='noreferrer'>
                  <h3>{articles[2].title}</h3>
                </a>
                <p>{articles[2].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

          <CardGroup>
            <Card>
              <Card.Img
                variant='top'
                src={articles[3].urlToImage}
                style={{ maxHeight: '14rem' }}
              />
              <Card.Body>
                <a href={articles[3].url} target='_blank' rel='noreferrer'>
                  <Card.Title>{articles[3].title}</Card.Title>
                </a>
                <Card.Text>{articles[3].description}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant='top'
                src={articles[4].urlToImage}
                style={{ maxHeight: '14rem' }}
              />
              <Card.Body>
                <a href={articles[4].url} target='_blank' rel='noreferrer'>
                  <Card.Title>{articles[4].title}</Card.Title>
                </a>
                <Card.Text>{articles[4].description}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img
                variant='top'
                src={articles[5].urlToImage}
                style={{ maxHeight: '14rem' }}
              />
              <Card.Body>
                <a href={articles[5].url} target='_blank' rel='noreferrer'>
                  <Card.Title>{articles[5].title}</Card.Title>
                </a>
                <Card.Text>{articles[5].description}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </>
      )}
    </>
  );
};

export default HomeScreen;
