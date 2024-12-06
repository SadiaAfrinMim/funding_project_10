import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase_init_';
import { toast } from 'react-toastify';
import useLocalStorage from 'use-local-storage';
import '../App'

export const AuthContex = createContext(null);


const Authprovider = ({ children }) => {
    const [user,setUser] = useState(null)
   
    const provider = new GoogleAuthProvider()
    const [photoUrl,setphotoUrl] = useState("")
    const [username,setName] = useState("")
    const [loading,setLoading] = useState(true)


      
   

    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", preference);
   

    const handleRegistration =(email,password)=>{
      setLoading(true)
      
       return createUserWithEmailAndPassword(auth, email, password)
    }
    const handleLogin =(email,password) =>{
      setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    const handleGoogleSignIn=()=>{
      setLoading(true)
  
  return signInWithPopup(auth, provider)

    }
    const logOut=()=>{
      toast("Log Out Successfully!")
      return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false)
          
        });

      
        
        return () => {
          unsubscribe();
        };
      }, []);
      const updateInformation =(updateData)=>{
       return updateProfile(auth.currentUser,updateData)
      }
    

  

    const authInfo = {
        user,
        setLoading,
        setUser,
        handleGoogleSignIn,
        handleLogin,
        handleRegistration,
        logOut,
        updateInformation,
        isDark,
        setIsDark,
        loading
    };

    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default Authprovider;
