import { useEffect, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import Headbar from '../components/Headbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '../hooks/useGoogleLogin'
import { useFacebookLogin } from '../hooks/useFacebookLogin'
import { getAdditionalUserInfo, getRedirectResult } from 'firebase/auth'
import { auth } from '../firebase/config'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {error, login} = useLogin()
  const gLogin = useGoogleLogin()
  const {fError, fLogin} = useFacebookLogin()
  const { user } = useAuthContext()

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    if(error !== null){
        console.log("User Not Found")
    }
  }

  const googleLogin = () => {
    gLogin()
  }

  const facebookLogin = () => {
    fLogin()
  }

  const handleNewUser = async () => {
    try{
      const result = await getRedirectResult(auth)
      if(result){
        const details = getAdditionalUserInfo(result)
        if(details.isNewUser){
          await setDoc(doc(db, "users", `${result.user.email}`), {
              uid: result.user.uid,
              email: result.user.email,
          })
          getRedirectResult(auth,)
          navigate('/userhome')
        }
      }
    } catch(error){}
  }

  useEffect(()=>{
    handleNewUser()
  }, [])

  if(user){
    return <Navigate to = "/userhome"/>
  }



  return (
    <div className="login-wrapper">
        <Headbar/>
        <div className="body">
            <h1>Login</h1>  
            <div className="socialbuttons">
              <button id = "google" className="social" onClick={googleLogin}>
                  <img 
                      src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                      width = {40}
                      height = {40}
                      alt="Google Login"
                  >
                  </img>
              </button>
              <button id = "facebook" className="social" onClick={facebookLogin}>
                  <img 
                      src = "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-circle-512.png"
                      width = {40}
                      height = {40}
                      alt="Facebook Login"
                  >
                  </img>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    className="email" 
                    id='regular'
                    type="text" 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    className="password"
                    id='regular' 
                    type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="regular">Login</button>

            </form>
            {error && <p>User Not Found</p>} 
        </div>
    </div>
  )
}
