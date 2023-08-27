//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

import { useCollection } from "../hooks/useCollection";
import { useEffect } from "react";

//Custom Hook Imports
import { Navigate, useLocation } from "react-router-dom";
import {useState } from "react";

//Color Palette Imports
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css"

import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

//Band List
import OrgBandList from "../components/OrgBandList";

export default function Org() {
    const { user } = useAuthContext()
    const { state } = useLocation()
    const [ org, setOrg ] = useState(state)
    const tempOrg = org ? org:{email:" "}
    
    const {documents: bands} = useCollection(`users/${tempOrg.email}/created`)

    console.log(bands)

    if(!user){
        return <Navigate to="/login" />
    }

    return(
        <div className="orgpage">
            <Headbar/>
            <div className="body">
                {tempOrg.email === " " && <h1>Invalid User</h1>}
                {tempOrg.email !== " " && <h1>{tempOrg.email}</h1>}
                {tempOrg.email !== " " && <div className="eventsBox"> {bands && <OrgBandList bands={bands}/>} </div>}
            </div>
            
        </div>
    )
    
}