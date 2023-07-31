//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

//Custom Hook Imports
import { useCollection } from "../hooks/useCollection";
import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import bandGraphic from "../BAND.png";

export default function BandHistory() {
    const { user } = useAuthContext()
    const temp = user ? user:{email:" "}
    const [purchaseActive, setPurchaseActive] = useState(true)

    const navigate = useNavigate()

    const handleClick = (band) => {
        navigate('/inactive', {state: band})
    }

    const {documents: purchasedHistory} = useCollection(
        `users/${temp.email}/purchaseHistory`
    )

    const {documents: createdHistory} = useCollection(
        `users/${temp.email}/createdHistory`
    )

    if(!user){
        return <Navigate to="/login" />
    }

    return(
        <div className="userhome">
        <Headbar/>
            <div className="body">
                <h1 className="colorLogo">BAND</h1>
                <div className="purchasedBox">
                    <h2 onClick={()=>{setPurchaseActive(true)}}>Inactive Purchased BANDS</h2>
                    <div className={`purchase${purchaseActive ? "active" : "inactive"}`}>
                        {purchasedHistory && 
                        <div className="band-list">
                            {purchasedHistory.map(band => (
                            <li 
                                key={band.id} 
                                onClick={() => {handleClick(band)}}
                            >
                                <img className="inactive" src={bandGraphic} style={{background: 'grey'}} alt="error" />
                                <p>{band['Event Name']}</p>
                            </li>
                            ))}
                        </div>}
                    </div>
                </div>
                <div className="createdBox">
                    <h2 onClick={()=>{setPurchaseActive(false)}}>Inactive Created BANDS</h2>
                    <div className={`created${purchaseActive ? "inactive":""}`}>
                        {createdHistory && 
                        <div className="band-list">
                            {createdHistory.map(band => (
                            <li 
                                key={band.id} 
                                onClick={() => {handleClick(band)}}
                            >
                                <img className="inactive" src={bandGraphic} style={{background: 'grey'}} alt="error" />
                                <p>{band['Event Name']}</p>
                            </li>
                            ))}
                        </div>
                        }
                    </div>
                </div>
            </div>  
        </div>
    )
    
}