import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProfielPageNew from "./pages/ProfilePageNew";
import CartPageNew from "./pages/CartPageNew";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-20 py-5">
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfielPageNew} />
        <Route path="/product/:id" component={ProductPage} exact />
        <Route path="/cart/:id?" component={CartPageNew} />
        <Route path="/" component={HomePage} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
