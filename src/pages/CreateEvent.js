//Component Imports
import Headbar from "../components/Headbar";

//Firebase
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//Color Palette Imports
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css"

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function CreateEvent() {
    const [eventName, setEventName] = useState('')
    const [eventPrice, setEventPrice] = useState('')
    const [eventLoc, setEventLoc] = useState('')
    // const [isPublic, setIsPublic] = useState(false)
    const [color, setColor] = useColor("hex", "#121212")
    const [datetime, setDatetime] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user } = useAuthContext();
    const [colorDimensions, setColorDimensions] = useState({width:263, height:232})
    const colorResize = () => {
        if(window.innerWidth > 1200){
            setColorDimensions({width: 456, height: 228})
        }
    }

    useEffect(()=>{
        window.addEventListener("resize", colorResize);
    }, [])

    if(!user){
        return <Navigate to="/login"/>
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        var dateObj = new Date()
        //Setting Date Object
        dateObj.setFullYear(datetime.$y, datetime.$M, datetime.$D)
        dateObj.setHours(datetime.$H)
        dateObj.setMinutes(datetime.$m)

        await addDoc(collection(db, `users/${user.email}/created`), {
            'Event Name':eventName,
            Price: parseInt(eventPrice),
            Location: eventLoc,
            creator: user.email,
            color: color.hex,
            date: dateObj,
            attendees: []
        })
        .then(async (docRef) => {
            // if(isPublic === "true"){
            //     var publicDoc = doc(db, `Public BANDs`,docRef.id)
            //     await setDoc(publicDoc, {
            //         'Event Name':eventName,
            //         Price: parseInt(eventPrice),
            //         Public: isPublic,
            //         creator: user.email,
            //         color: color.hex,
            //         date: dateObj,
            //         attendees: []
            //     })
            // }
        })
        .then(() => {
            setIsSubmitting(false)
            setEventName('')
            setEventPrice('')
            setEventLoc('')
            setDatetime('')
        })
        
    }

    return(
        <div className="create-event">
            <Headbar/>
            <div className="body">
                <h1>Create Event</h1>
                <form onSubmit={handleSubmit}>
                    <label>Event Name</label>
                    <input 
                        type="text" 
                        id='regular'
                        required
                        value={eventName}
                        onChange={(e)=>setEventName(e.target.value)}
                    />
                    <label>Price</label>
                    <input 
                        type="number"
                        id='regular'
                        required
                        value={eventPrice}
                        className="Price"
                        onChange={(e)=>setEventPrice(e.target.value)}
                    />
                    <label>Location</label>
                    <input 
                        type="text"
                        id='regular'
                        required
                        value={eventLoc}
                        onChange={(e)=>setEventLoc(e.target.value)}
                    />

                    {/* <select  
                        value = {isPublic}
                        onChange={(e)=>setIsPublic(e.target.value)}
                    >
                        <option value={true}>Public</option>
                        <option value={false}>Private</option>
                    </select> */}

                    <p className="date">Date and Time</p>

                    <LocalizationProvider dateAdapter={AdapterDayjs}    >
                        <DateTimePicker
                            label = "controller picker" 
                            required
                            value = {datetime}
                            onChange={(e) => {setDatetime(e)}}
                        />
                    </LocalizationProvider>
                    
                    <ColorPicker 
                        color={color} 
                        onChange={setColor} 
                        hideHSV dark 
                        width={colorDimensions.width} 
                        height={colorDimensions.height}
                    />
                    <button className="regular" disabled = {isSubmitting}>Add Event</button>
                </form>
            </div>     
        </div>
    )
    
}