import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CreateTransactionScreen from './screens/CreateTransactionScreen';
import PortifolioScreen from './screens/PortifolioScreen';
import UpdateTransactionScreen from './screens/UpdateTransactionScreen';
import StockDetailsScreen from './screens/StockDetailsScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/login' component={LoginScreen} />
            <Route path='/signup' component={SignUpScreen} />
            <Route path='/portifolio/new' component={CreateTransactionScreen} />
            <Route path='/portifolio/' component={PortifolioScreen} />
            <Route
              path='/transaction/:transactionId/edit'
              component={UpdateTransactionScreen}
            />
            <Route path='/stock/:symbol' component={StockDetailsScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
