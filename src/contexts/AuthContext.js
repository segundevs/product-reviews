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
    // try {
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
      window.location.replace('/login')
      toast.success('Successfully created account!', {theme: "colored", autoClose: 2000 })
      return response.user
    })
    .catch(err => {
      if(err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
        setError('Password should be at least 6 characters')
      }
     else if(err.message === 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
        setError('The email address is already in use by another account')
      } 
      else {
        setError('There was a network error')
      }
      setLoading(false)
    }) 
  };

const login = (email, password) => {
  setLoading(true)
  
    return firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(response => {
    setUser(response.user)
    setLoading(false)
    window.location.replace('/')
    toast.success('Successfully signed in', {theme: "colored", autoClose: 2000 })
    return response.user
  })
  .catch(err => {
    if(err.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'){
      setError('The password is invalid or the user does not have a password')
    }
    else if (err.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'){
      setError('There is no user with this email address or the user may have been deleted')
    }
    else {
      setError(err.message)
    }
     setLoading(false)
     
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
  setLoading(true)
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false)
        toast.success('Please check your email to reset your password', {theme: "colored", autoClose: 2000 })
        return true;
      }).catch(err => {
        setError(err.message)
        setLoading(false)
        toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
      })
  };
  

  const signInWithGoogle = () => {
    setLoading(true)
      return firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(response => {
      setUser(response.user)
      setLoading(false)
      window.location.replace('/')
      toast.success('Successfully signed in!', {theme: "colored", autoClose: 2000 })
      return response.user
    }).catch(err => {
        setError(err.message)
        setLoading(false)
        toast.error( error? `${error}` : 'Something went wrong!', {theme: "colored", autoClose: 2000 })
    })   
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
    error,
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