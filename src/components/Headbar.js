import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { slide as Menu } from 'react-burger-menu'

function Headbar(){
    const { logout } = useLogout()
    const { user } = useAuthContext()

    return (  
        <nav className="headbar">    
            <div className="menu">
                <Menu className="links">
                    {user && <Link to="/userhome">Home</Link>}
                    {!user && <Link to="/">About</Link>}
                    {!user && <Link to="/signup">Sign Up</Link>}
                    {!user && <Link to="/login">Log In</Link>}
                    {user && <Link to="/create">Create BAND</Link>}
                    {user && <Link to="/search">Search Users</Link>}
                    {user && <Link to= "/edit">Edit BANDs</Link>}
                    {user && <Link to= "/verify">Verify BANDs</Link>}
                    {user && <Link to= "/invite">Invite</Link>}
                    {user && <Link to= "/history">Inactive BANDs</Link>}
                    {user && <button className="logout" onClick={logout}>Logout</button>}
                </Menu>
            </div>
            <div className="headlogo">
                {<Link className = "Logo" to="/">BAND</Link>}
            </div>
            <div className="rightcorner">
                {user && <p>{user.email}</p>}
            </div>
            
        </nav>
    );
}
 
export default Headbar;