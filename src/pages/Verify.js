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

export default function UseHome() {
    const { user } = useAuthContext()
    const [color, setColor] = useColor("hex", "#121212")
    const { state } = useLocation()
    const [ band, setBand ] = useState(state)
    const temp = user ? user:{email:" "}
    const [colorDimensions, setColorDimensions] = useState({width:263, height:232})
    const colorResize = () => {
        if(window.innerWidth > 1200){
            setColorDimensions({width: 456, height: 228})
        }
    }

    useEffect(()=>{
        window.addEventListener("resize", colorResize);
    }, [])

    const {documents: bands} = useCollection(`users/${temp.email}/created`)

    const updateColor = (toColor) => {
        const docRef = doc(db, `users/${user.email}/created`, band)
        
        const data = {
            color: toColor.hex
        }
        updateDoc(docRef,data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated")
            })
            .catch(error => {
                console.log(error);
            })
    }

    if(!user){
        return <Navigate to="/login" />
    }

    return(
        <div className="verifyhome">
            <Headbar/>
            <div className="body">
                <h1>Verify BAND</h1>
                {!band && <h2>Pick BAND to Verify</h2>}
                {bands && 
                <select 
                    className="select-list" 
                    value = {band}
                    defaultValue={"placeholder"}
                    onChange={(e)=>setBand(e.target.value)}
                >
                    <option value="placeholder" disabled >Select BAND</option>
                    {bands.map(band => (
                        <option value={band.id}>
                            {band['Event Name']}
                        </option>
                    ))}
                </select>} 
                {band && <p>Change Color</p>}
                {band && <ColorPicker 
                    color={color}
                    onChange={setColor}
                    onChangeComplete={(color) => {updateColor(color)}}
                    hideHSV dark 
                    width={colorDimensions.width} 
                    height={colorDimensions.height}
                />}
            </div>
            
        </div>
    )
    
}