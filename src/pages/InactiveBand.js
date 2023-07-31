//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

//React
import { Navigate, useLocation } from "react-router-dom";
import {useState} from "react";

import bandGraphic from "../BAND.png";

export default function InactiveBand() {
    const { user } = useAuthContext()
    const { state } = useLocation()
    const [ band ] = useState(state)
    const date = new Date(band.date.seconds * 1000)
    const minutes = date.getMinutes()<10 ? "0" + date.getMinutes().toString() : date.getMinutes()
    
    if(!user){
        return <Navigate to="/login" />
    }

    if(!band){
        return <Navigate to="/" />
    }

    return(
        <div className="bandpage">
            <Headbar/>
            <div className="band">
                <h1>{band['Event Name']}</h1>
                <img className = "inactive " src={bandGraphic} style={{background: 'grey'}} alt="error" />
                <h2>{date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()}</h2>
                <h3>{((date.getHours() + 11)%12 + 1) + ":" + minutes + " " + (date.getHours()<=12? "AM":"PM")}</h3>
                <p>Inactive Band</p>
            </div>
            
        </div>
    )
    
}