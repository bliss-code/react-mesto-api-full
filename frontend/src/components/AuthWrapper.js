import { AuthContext } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { api } from '../utils/api';

export default function AuthWrapper({children}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  //check if already logged in
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      api.checkToken(jwt)
      .then(res => {
        localStorage.setItem('email', res.data.email);
        setIsLoggedIn(true);
      })
      .catch(err => {
        console.log(err);
      });
    }
  });

  useEffect(() => {
    if (isLoggedIn)
      history.push('/');
  }, [isLoggedIn, history]);

  function toggle (value) {
    setIsLoggedIn(value);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, setupIsLoggedIn: toggle }}>
      {children}
    </AuthContext.Provider>
  );
}
