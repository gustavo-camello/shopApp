import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';


const App = () => {
  return (
    <Router>
      <Header />
        <main className="container mx-auto px-20 py-5">
          <Route path='/' component={HomePage} exact />
          <Route path='/product/:id' component={ProductPage} exact />
          <Route path='/cart/:id?' component={CartPage} />
        </main>
      <Footer />
    </Router>
  );
}

export default App;
