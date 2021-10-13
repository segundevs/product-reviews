import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Reviews from './pages/Reviews/Reviews';
import Login from './pages/Login/Login';

function App() {
  return (
   <Router >
      <Header />
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/reviews/:id">
            <Reviews />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
      </Switch>

    </Router>
  );
}

export default App;
