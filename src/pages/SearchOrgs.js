//Component Imports
import { useState } from "react";
import Headbar from "../components/Headbar";
import OrgList from "../components/OrgList";

//Custom Hook Imports
import { useCollection } from "../hooks/useCollection";
import { useEffect } from "react";
import { db } from "../firebase/config";

import { collection, doc } from "firebase/firestore";

export default function SearchOrgs() {
    
    //const [orgDoc, setOrgDoc] = useState(doc(db, `users/${target}`))
    const [target, setTarget] = useState("")

    const {documents: orgs} = useCollection('users')
    
    return(
        <div className="search">
        <Headbar/>
            <h1>Search User</h1>
            <input 
                className="email" 
                id='regular'
                type="text" 
                placeholder='User Email'
                value={target}
                onChange={(e)=>setTarget(e.target.value)}
            />
            {orgs && <OrgList orgs={orgs} query={target}/>}
        </div>
    )
    
}