import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <div>
              <img
                src='/chartlogo.png'
                width='30'
                height='30'
                className='d-inline-block align-top mr-3 '
                alt='stock tracker logo'
              />
              <Navbar.Brand href='/'>Stock Tracker</Navbar.Brand>
            </div>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {userInfo && (
              <Nav className='mr-auto'>
                <LinkContainer to='/portifolio'>
                  <Nav.Link href='/portifolio'>Portifolio</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/portifolio/new'>
                  <Nav.Link href='/portifolio/new'>Add Transaction</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            <Nav className='ml-auto'>
              {!userInfo ? (
                <>
                  <LinkContainer to='/login'>
                    <Button className='mx-1' variant='success' href='/login'>
                      Login
                    </Button>
                  </LinkContainer>
                  <LinkContainer to='/signup'>
                    <Button
                      className='mx-1'
                      variant='outline-success'
                      href='/signup'>
                      Sign Up
                    </Button>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
