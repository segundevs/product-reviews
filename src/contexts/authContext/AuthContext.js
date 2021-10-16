import { createContext, useContext, useState, useEffect } from "react";
import firebase from '../../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);


  const signUp = (email, password) => {
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      setUser(response.user)
      return response.user
    })
  };

const login = (email, password) => {
  return firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(response => {
    setUser(response.user)
    return response.user
  })
}

const logOut = () => {
  return firebase
  .auth()
  .signOut()
  .then(() => {
    setUser(false)
  })
}

const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    user,
    isAuthenticating,
    signUp,
    login,
    logOut,
    sendPasswordResetEmail,
    confirmPasswordReset
  }

  return (
  <AuthContext.Provider value={{values}}>
    {!isAuthenticating && children}
  </AuthContext.Provider>
  )
}

export default AuthProvider;