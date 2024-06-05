import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config';
import PropTypes from 'prop-types';
// import axios from "axios";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);

    const createUser = (email, password) => {
        setloading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setloading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // const userEmail = currentUser?.email || user?.email;
            // const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('current user', currentUser);
            setloading(false);
            // if (currentUser) {
            //     axios.post('https://localhost:8000/jwt', loggedUser, { withCredentials: true })
            //         .then(res => {
            //             console.log('token response', res.data);
            //         })
            // } 
            // else {
            //     axios.post('https://localhost:8000/logout', loggedUser, {
            //         withCredentials: true
            //     })
            //         .then(res => {
            //             console.log(res.data);
            //         })
            // }
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = { user, loading, createUser, signInUser, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;

AuthProviders.propTypes = {
    children: PropTypes.node
}