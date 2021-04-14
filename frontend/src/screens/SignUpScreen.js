import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { signUpUser } from '../actions/userActions';

const SignUpScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userSignUp = useSelector((state) => state.userSignUp);
  const { loading, userInfo, error } = userSignUp;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/portifolio';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUpUser(name, email, password));
    } else {
      setMessage('Passwords do not match');
    }
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col className='border p-4 authenication-form' xs={12} md={6}>
          <h1 className='text-center'>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Control
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Control
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button type='submit' variant='success' className='mx-auto'>
              Sign Up
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an account?{' '}
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpScreen;
