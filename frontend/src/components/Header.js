import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
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
            <Navbar.Brand href='/'>Stock Tracker</Navbar.Brand>
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
                    <Nav.Link href='/login'>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/signup'>
                    <Nav.Link href='/signup'>Sign Up</Nav.Link>
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
