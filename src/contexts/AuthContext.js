import { createContext, useContext, useState, useEffect } from "react";
import firebase from '../firebase';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const signUp = (email, password, name) => {
    setLoading(false)
    try {
      return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      setUser(response.user)
      const user = firebase.auth().currentUser;
      user.updateProfile({
      displayName: name
     })
      setLoading(false)
      toast.success('Successfully created account!', {theme: "colored", autoClose: 2000 })
      return response.user
    })
    } catch (err) {
      setError(err.message)
      setLoading(false)
      toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
    }  
  };

const login = (email, password) => {
  setLoading(true)
  try {
    return firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(response => {
    setUser(response.user)
    setLoading(false)
    toast.success('Successfully signed in', {theme: "colored", autoClose: 2000 })
    return response.user
  })
  } catch (err) {
    setError(err.message)
    setLoading(false)
    toast.error( error ? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
  }
  
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
  setLoading(true)
  try {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false)
        toast.success('Please check your email to reset your password', {theme: "colored", autoClose: 2000 })
        return true;
      });
    }catch (err) {
      setError(err.message)
      setLoading(false)
      toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
    }   
  };
  

  const signInWithGoogle = () => {
    setLoading(true)
    try {
      return firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(response => {
      setUser(response.user)
      setLoading(false)
      toast.success('Successfully signed in!', {theme: "colored", autoClose: 2000 })
      return response.user
    });    
    } catch (err) {
      setError(err.message)
      setLoading(false)
      toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
    }
    
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
    loading,
    user,
    isAuthenticating,
    signUp,
    login,
    logOut,
    sendPasswordResetEmail,
    signInWithGoogle
   
  }

  return (
  <AuthContext.Provider value={values}>
    {!isAuthenticating && children}
  </AuthContext.Provider>
  )
}

export default AuthProvider;