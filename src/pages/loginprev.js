
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import Headbar from '../components/Headbar'
import { useAuthContext } from '../hooks/useAuthContext'
import { Navigate } from 'react-router-dom'
import { useGoogleLogin } from '../hooks/useGoogleLogin'
import { useFacebookLogin } from '../hooks/useFacebookLogin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isContainerActive, setIsContainerActive] = useState(false)
  const {error, login} = useLogin()
  const {gError, gLogin } = useGoogleLogin()
  const {fError, fLogin} = useFacebookLogin()
  const { user } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const googleLogin = () => {
    gLogin()
  }

  const facebookLogin = () => {
        fLogin()
  }

  const setNotActive = () => {
    setIsContainerActive(false)
  }

  const setActive = () => {
    setIsContainerActive(true)
  }

  if(user){
    return <Navigate to = "/"/>
  }



  return (
    <div className="login-wrapper">
        <Headbar/>
        <div id="container" className={`container${isContainerActive ? " right-panel-active" : ""}`}>
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <button className="social" onClick={googleLogin}>
                            <img 
                                src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                                width = {40}
                                height = {40}
                                alt="Google Create"
                            >
                            </img>
                        </button>
                        <button className="social" onClick={facebookLogin}>
                            <img 
                                src = "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-circle-512.png"
                                width = {40}
                                height = {40}
                                alt="Facebook Create"
                            >
                            </img>
                        </button>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit}>
                    <h1>Log in</h1>
                    <div className="social-container">
                        <button className="social" onClick={googleLogin}>
                            <img 
                                src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                                width = {40}
                                height = {40}
                                alt="Google Login"
                            >
                            </img>
                        </button>
                        <button className="social" onClick={facebookLogin}>
                            <img 
                                src = "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-circle-512.png"
                                width = {40}
                                height = {40}
                                alt="Facebook Login"
                            >
                            </img>
                        </button>
                        <br></br>
                    </div>
                    <span>or use your account</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        
                    />
                    {/* <a href="#">Forgot your password?</a> */}
                    <p>Forgot your password?</p>
                    <button className='regular'>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn" onClick={setNotActive}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Join the BAND</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp" onClick={setActive}>Sign Up</button>
                    </div>
                </div>
            </div>
            {error && <p>{error}</p>}
            {gError && <p>{gError}</p>}
            {fError && <p>{fError}</p>}
        </div>
        
        <footer>
            <p>Join the BAND and learn how you can streamline ticketing and wristbands for your next event</p>
        </footer>
    </div>
    
  )

  
}
