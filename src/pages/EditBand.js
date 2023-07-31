//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

import { useCollection } from "../hooks/useCollection";

//Custom Hook Imports
import { Navigate } from "react-router-dom";
import {useState } from "react";

import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

//Date Imports
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function EditBand() {
    const { user } = useAuthContext()

    const [datetime, setDatetime] = useState('')
    const [eventLoc, setEventLoc] = useState('')
    const [ band, setBand ] = useState('')
    const [updateField, setUpdateField] = useState('')
    const [submitMsg, setSubmitMsg] = useState('')

    const temp = user ? user:{email:" "}

    const {documents: bands} = useCollection(`users/${temp.email}/created`)

    const updateLoc = async () => {
        const docRef = doc(db, `users/${user.email}/created`, band)
        
        const data = {
            Location: eventLoc
        }
        await updateDoc(docRef,data)
            .then(docRef => {
                setSubmitMsg("Location Successfully Changed")
                setEventLoc('')
            })
            .catch(error => {
                setSubmitMsg("Error Updating Location")
            })
    }

    const updateDateTime = async () => {
        //Setting Date Object
        var dateObj = new Date()
        dateObj.setFullYear(datetime.$y, datetime.$M, datetime.$D)
        dateObj.setHours(datetime.$H)
        dateObj.setMinutes(datetime.$m)

        const docRef = doc(db, `users/${user.email}/created`, band)
        const data = {
            date: dateObj
        }
        await updateDoc(docRef,data)
            .then(docRef => {
                setSubmitMsg("Date & Time Successfully Changed")
                setDatetime('')
            })
            .catch(error => {
                setSubmitMsg("Error Updating Date and Time");
            })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(updateField==="Location"){
            updateLoc(eventLoc)
        }
        else{
            updateDateTime(datetime)
        }
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return(
        <div className="edithome">
            <Headbar/>
            <div className="body">
                <h1>Edit BAND Details</h1>
                {band==='' && <h2>Pick BAND to Edit</h2>}
                {bands && 
                <select 
                    className="select-list"
                    id='bandSelect'
                    value = {band}
                    onChange={(e)=>setBand(e.target.value)}
                >
                    <option value="">Select Band</option>
                    {bands.map((band) => (
                        <option key={band.id} value={band.id}>
                            {band['Event Name']}
                        </option>
                    ))}
                </select>}
                {band!=='' && <select 
                    className="select-list"
                    id='editFieldSelect'
                    value = {updateField}
                    onChange={(e)=>{
                        setUpdateField(e.target.value)
                        setSubmitMsg('')
                    }}
                >
                    <option value="">Select Field to Update</option>      
                    <option value="Location"> Location </option>
                    <option value="DateTime"> Date and Time </option>
                </select>}

                {updateField !== '' && band !== '' && 
                <form onSubmit={handleSubmit}>
                    {updateField==="DateTime" && <p>Change Date and Time</p>}
                    {updateField==="DateTime" && 
                    <LocalizationProvider dateAdapter={AdapterDayjs}    >
                        <DateTimePicker
                            label = "controller picker" 
                            required
                            value = {datetime}
                            onChange={(e) => {setDatetime(e)}}
                        />
                    </LocalizationProvider>
                    }
                    {updateField==="Location" && <p>Change Location</p>}
                    {updateField==="Location" && 
                    <input 
                        type="text"
                        id='regular'
                        required
                        value={eventLoc}
                        onChange={(e)=>setEventLoc(e.target.value)}
                    />
                    }
                    {updateField !=='' && band !== '' && <button className="regular">Confirm</button>}
                    <p>{submitMsg}</p>
                </form>}               
            </div> 
        </div>
    )
    
}
