//firebase imports
import { auth, googleProvider } from "../firebase/config";
import { signInWithRedirect } from "firebase/auth"; //Import GoogleAuthProvider if you want access to Google API


export const useGoogleLogin = () => {
    const gLogin = () => { 
        signInWithRedirect(auth, googleProvider)
    }
    return gLogin
}