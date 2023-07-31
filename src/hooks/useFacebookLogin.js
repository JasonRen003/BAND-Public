import { useState } from 'react'

//firebase imports
import { auth, db, facebookProvider } from "../firebase/config";
import { getAdditionalUserInfo, signInWithRedirect } from "firebase/auth"; //Import FacebookAuthProvider if wanting to access Facebook API
import { useAuthContext } from './useAuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const useFacebookLogin = () => {
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    const { navigate } = useNavigate()
    const fLogin = () => {
        setError(null)
        signInWithRedirect(auth, facebookProvider)
            .then((res) => {
                dispatch({type: 'LOGIN', payload: res.user})
                if(getAdditionalUserInfo(res).isNewUser){
                    console.log("ADDED NEW USER DOC")
                    setDoc(doc(db, "users", `${res.user.email}`), {
                        uid: res.user.uid,
                        email: res.user.email,
                    })
                } 
                navigate('/userhome')
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                //const credential = FacebookAuthProvider.credentialFromResult(res);
                //const token = credential.accessToken;
            })
            .catch((err)=>{
                setError(err.message)
            })
    }
    
    return {error,fLogin}
}