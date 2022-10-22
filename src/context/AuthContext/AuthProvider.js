import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null)
    const providerLogin = (provider) => {
        setLoading(false)
        return signInWithPopup(auth, provider);
    }
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const handleEmailVarification = () => {
        return sendEmailVerification(auth.currentUser)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() =>{
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
            
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false)
        })
        return () => {
            unsubsribe();
        }
    }, [])

    const authInfo = {user, loading, setLoading, providerLogin, logOut, handleEmailVarification, createUser, signIn, updateUserProfile}

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
