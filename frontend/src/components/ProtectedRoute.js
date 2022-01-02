import { Route, Redirect } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function ProtectedRoute(props) {

  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn)
    return <Redirect to="/sign-in" />
  else
    return (
      <Route {...props} />
    );
}
