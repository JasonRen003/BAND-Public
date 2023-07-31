import { useState } from "react";

//firebase imports
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from './useAuthContext';
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = (email, password) => {
        setError(null)
        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                dispatch({type: 'LOGIN', payload: res.user});
                setDoc(doc(db, "users", `${res.user.email}`), {
                    uid: res.user.uid,
                    email: res.user.email,
                });
            })
            .catch((err)=>{
                setError(err.message)
            })
    }


    
    return {error,signup}
}
 
