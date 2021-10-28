import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({children, ...rest}) => {

  const {user} = useAuth()

  return (
    <Route
    {...rest}
    render={() => user ? children : <Redirect to="/login" />}
    >  
    </Route>
  )
}

export default PrivateRoute
