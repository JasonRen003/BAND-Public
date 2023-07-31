import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

function Sidebar(){
    const { logout } = useLogout()
    return (  
        <nav className="sidebar">
            <ul className="activities">
                <li><Link to="/search">Search BANDs</Link></li>
                <li><Link to="/create">Create BAND</Link></li>
                <li><Link to="/nearby">Nearby BANDs</Link></li>
                <li><Link to="/nearby">Past BANDs</Link></li>
            </ul>
        </nav>
    );
}
 
export default Sidebar;