import { db } from "../firebase/config"
import { doc, deleteDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bandGraphic from "../LightBand.png";

export default function PersonalBandList({bands}) {

  const {user} = useAuthContext()
  const navigate = useNavigate()


  const handleClick = (band) => {
    // navigate('/band', {state: band})
    console.log("I LOVE SARAH BEARAH")
  }

  return (
    <div className="band-list">
      {bands.map((band) => (
        <li 
          key={band.id} 
          onClick={() => {handleClick(band)}}
          id='active'
        >
          <p>{band['Event Name']}</p>
          <p>{band['Date']}</p>
          <p>{band['Location']}</p>
          <p>{band['Price']}</p>
        </li> 
      ))}
    </div>
  )
}