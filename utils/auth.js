import React, {useState, useEffect, useContext, createContext} from 'react';
import queryString from 'query-string';
import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        let user = null;
        setLoading(true);
        if (typeof window !== 'undefined') {
            user = localStorage.getItem('@GoMember:user');
        }

        if (user) {
            setLoading(false);
            return user;
        }
        setLoading(false);
        return user;
    });

    const signin = (email, password) => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                if (typeof window !== 'undefined') {
                    const {uid, email} = response.user;
                    localStorage.setItem('@GoMember:user', JSON.stringify({uid, email}));
                }

                setLoading(false);
                return response.user;
            });
    };

    const signup = (email, password) => {
        setLoading(true);
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('@GoMember:user', response.user);
                }
                setLoading(false);
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('@GoMember:user');
                }
            });
    };

    const sendPasswordResetEmail = (email) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (password, code) => {
        const resetCode = code || getFromQueryString('oobCode');

        return firebase
            .auth()
            .confirmPasswordReset(resetCode, password)
            .then(() => {
                return true;
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        userId: user && user.uid,
        loading,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

const getFromQueryString = (key) => {
    return queryString.parse(window.location.search)[key];
};
