//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

import { useCollection } from "../hooks/useCollection";

//Custom Hook Imports
import { Navigate } from "react-router-dom";
import {useState } from "react";
import { useFindUser } from "../hooks/useFindUser";

//Firebase Imports
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import { useZxing } from "react-zxing";
import { onSnapshot } from "firebase/firestore";

export default function Invite() {
    const { user } = useAuthContext()
    const temp = user ? user:{email:" "}
    const { finder } = useFindUser()


    const [lastInvited, setLastInvited] = useState('')
    const [invited, setInvited] = useState(false)
    const [ inviteEmail, setInviteEmail] = useState("")
    const [ band, setBand ] = useState('')
    const [ scan, setScan ] = useState(false)
    const [foundUser, setFoundUser] = useState(false)
    

    const {documents: bands} = useCollection(`users/${temp.email}/created`)

    const findUser = async (e) => {
        e.preventDefault()
        const docRef = await doc(db, `users/${user.email}/created`, band);
        const bandDoc = (await getDoc(docRef)).data();
        var userRef = doc(db,"users",inviteEmail)
        onSnapshot(userRef,
            async snap => {
                if(snap.exists()){
                    setFoundUser(true)
                    finder(inviteEmail, bandDoc, band)
                }
                else{
                    setFoundUser(false)
                }
            }
        )
        setLastInvited(inviteEmail)
        setInvited(true)
        setInviteEmail('')
    }

    const handleScan = async (res) => {
        if(res !== lastInvited && inviteEmail!==''){
            const docRef = await doc(db, `users/${user.email}/created`, band);
            const bandDoc = (await getDoc(docRef)).data();
            var userRef = doc(db,"users",inviteEmail)
            onSnapshot(userRef,
                async snap => {
                    if(snap.exists()){
                        setFoundUser(true)
                        finder(inviteEmail, bandDoc, band) 
                    }
                    else{
                        setFoundUser(false)
                    }
                }
            )          
            setLastInvited(res)
            setInvited(true)
            setScan(false)
            setInviteEmail('')
        }
    }

    const { ref } = useZxing({
        onResult(res){
            setInviteEmail(res.getText())
            handleScan(res.getText())  
        },
        paused: !scan,
    });

    if(!user){
        return <Navigate to="/login" />
    }

    return(
        <div className="invitehome">
            <Headbar/>
            <div className={`scan${scan ? "active" : "inactive"}`} onClick={()=>{setScan(false)}}>
                {/* <QrReader
                    delay={1000}
                    className = 'scanner'
                    onScan={(res)=>{handleScan(res)}}
                    onError={handleError}
                /> */}
                <video ref={ref} />
            </div>  
            
            <div className="body">
                <h1>Invite People To BANDs</h1>
                <h2>Pick BAND</h2>
                {bands && 
                <select 
                    className="select-list"
                    value = {band}
                    onChange={(e)=>{
                        setBand(e.target.value)
                        setInvited(false)
                    }}
                >
                    <option value="">Select BAND</option>
                    {bands.map(band => (
                        <option key={band.id} value={band.id}>
                            {band['Event Name']}
                        </option>
                    ))}
                </select>}            
                {band!=='' && 
                    <form onSubmit={findUser}>
                        <label>Enter Email</label>
                        <input 
                            type="text" 
                            id="regular"
                            required
                            value={inviteEmail}
                            onChange={(e)=>setInviteEmail(e.target.value.toLowerCase())}
                        />
                    </form>  
                }
                {band!=='' && <p>Or</p>}
                {band!=='' && 
                <button
                    className="regular"
                    onClick={()=>{setScan(true)}}
                >
                Scan QR Code
                </button>}
                {band!=='' && invited && !foundUser &&
                    <p style={{color:'red'}}>User Not Found</p>
                }
                {band!=='' && invited && foundUser &&
                    <p>Successfully invited {lastInvited}</p>
                }
                
            </div>
            
            {/* {band!=='' && !invited && 
                <p>Error inviting {lastInvited}</p>
            } */}
        </div>
    )
    
}