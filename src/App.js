import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Reviews from './pages/Reviews/Reviews';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';


function App() {

  return ( 
   <Router >
      <Header />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/product" >
            <Product />
          </PrivateRoute>
          <Route path="/reviews/:id">
            <Reviews />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
      </Switch>
    </Router> 
  );
}

export default App;
