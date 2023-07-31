//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

//React
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

import { setDoc,deleteDoc } from "firebase/firestore";
import bandGraphic from "../BAND.png";

export default function Band() {
    const { user } = useAuthContext()
    const { state } = useLocation()
    const [ band ] = useState(state)
    const [color, setColor ] = useState()
    const [clicked, setClicked] = useState(false)
    const [entered, setEntered] = useState(false)
    const date = new Date(band.date.seconds * 1000)
    const minutes = date.getMinutes()<10 ? "0" + date.getMinutes().toString() : date.getMinutes()
    const navigate = useNavigate()
    const tempUser = user ? user:{email:" "}
    const tempBand = band ? band:{id: " ", creator: " "}

    useEffect(() => {
        console.log("Band Page Listener Started")
        const  unsub = onSnapshot(doc(db, `users/${tempBand.creator}/created`, tempBand.id), async (docRef) => {
            const personalDocRef = doc(db, `users/${tempUser.email}/purchased`, tempBand.id)
            const data = {
                color: docRef.data().color
            }
                        
            setColor(data.color)
            updateDoc(personalDocRef,data)
            .then(personalDocRef => {
                //console.log("Value of an Existing Document Field has been updated")
            })
            .catch(error => {
                console.log(error);
            }) 
            
        });
        return() => {
            console.log("Band Page Listener Unsubbed")
            unsub()};
    }, [tempBand.creator, tempUser.email, tempBand.id])
    
    const handleClick = (async ()=>{
        await setDoc(doc(db, `users/${user.email}/purchaseHistory`, band.id), {
            'Event Name': band['Event Name'],
            Price: band.Price,
            Location: band.Location,
            creator: band.creator, 
            color: band.color,
            date: band.date
        })
        .then(async () => {
          const docRef = doc(db, `users/${user.email}/purchased`, band.id)
          await deleteDoc(docRef)
        })
        .then(()=>{
            setClicked(false)
            setEntered(true)
            console.log("ENTERED EVENT")
        })
    })
    if(!user){
        return <Navigate to="/login" />
    }

    if(!band){
        return <Navigate to="/userhome" />
    }


    console.log(color)
    return(
        <div className="bandpage">
            <div className={`shadow${clicked ? "active" : "inactive"}`}></div>
            
            <div className={`overlay${entered ? "active" : "inactive"}`} onClick={() => {navigate('/userhome')}}>
                <h1>Entered Event</h1>
            </div>
            <Headbar/>
            <div className="band">
                <div className={`confirmation${clicked ? "active" : "inactive"}`}>
                    <p>Are you sure you want to enter? <br/> Your BAND will become inactive <br/> and can't be used again.</p>
                    <button id="yes" onClick={handleClick}>Yes</button>
                    <button id="no" onClick={() => setClicked(false)} style={{color: 'black'}}>No</button>
                </div>
                <h1>{band['Event Name']}</h1>
                <img src={bandGraphic} style={{background: color}} alt="error" />
                <h2>{date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear()}</h2>
                <h3>{((date.getHours() + 11)%12 + 1) + ":" + minutes + " " + (date.getHours()<=12? "AM":"PM")}</h3>
                <h3>{band.Location}</h3>
                <p>Show BAND to Host</p>
                <button className="regular" onClick={()=>setClicked(true)}>Enter Event</button>
            </div>   
        </div>
    )
    
}