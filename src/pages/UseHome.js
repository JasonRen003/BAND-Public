//Component Imports
import { useState } from "react";
import CreatedBandList from "../components/CreatedBandList";
import Headbar from "../components/Headbar";
import PersonalBandList from "../components/PersonalBandList";
import { useAuthContext } from "../hooks/useAuthContext";

//Custom Hook Imports
import { useCollection } from "../hooks/useCollection";
import { Navigate } from "react-router-dom";

import QRCode from 'react-qr-code';

export default function UseHome() {
    const { user } = useAuthContext()
    const temp = user ? user:{email:" "}
    const [purchaseActive, setPurchaseActive] = useState(true)
    const [qrActive, setQRActive] = useState(false)
    
    const {documents: purchased} = useCollection(
        `users/${temp.email}/purchased`
    )

    const {documents: created} = useCollection(
        `users/${temp.email}/created`
    )

    if(!user){
        return <Navigate to="/login" />
    }
    
    return(
        <div className="userhome">
        <Headbar/>
        <div className={`qr${qrActive ? "active" : "inactive"}`} onClick={() => {setQRActive(false)}}>
            <QRCode className="QRCode" value={user.email}/>
        </div>
        <button className="clear" onClick={()=>{setQRActive(true)}}/>
            <div className="body">
                <h1 className="colorLogo">Home</h1>
                <div className="purchasedBox">
                    <h2 onClick={()=>{setPurchaseActive(true)}}>Purchased BANDS</h2>
                    <div className={`purchase${purchaseActive ? "active" : "inactive"}`}>
                        {purchased && <PersonalBandList bands={purchased}/>}
                    </div>
                </div>
                <div className="createdBox">
                    <h2 onClick={()=>{setPurchaseActive(false)}}>Created BANDS</h2>
                    <div className={`created${purchaseActive ? "inactive":""}`}>
                        {created && <CreatedBandList bands={created}/>}
                    </div>
                </div>
                
            </div>  
        </div>
    )
    
}