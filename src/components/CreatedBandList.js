import { db } from "../firebase/config"
import { doc, deleteDoc, setDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bandGraphic from "../LightBand.png";

export default function CreatedBandList({bands}) {

  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = (band) => {
    navigate('/verify', {state: band.id.toString()})
  }

  useEffect(() => {
    var currentDateTime = new Date()
    bands.forEach(async band => {
      var bandDateTime = new Date(band.date.seconds * 1000)
      if((currentDateTime - bandDateTime) / 36e5 > 3){
        await setDoc(doc(db, `users/${user.email}/createdHistory`, band.id), {
            'Event Name': band['Event Name'],
            Price: band.Price,
            Location: band.Location,
            creator: band.creator, 
            color: band.color,
            date: band.date,
            attendees: band.attendees
        })
        .then(async () => {
          const docRef = doc(db, `users/${user.email}/created`, band.id)
          await deleteDoc(docRef)
          // if(band.Public){
          //   const publicRef = doc(db, 'Public BANDs', band.id)
          //   await deleteDoc(publicRef)
          // }
        })
      }
    })
    
  }, [bands,user.email])

  return (
    <div className="band-list">
      {
        bands.map(band => (
        <li 
          key={band.id} 
          onClick={() => {handleClick(band)}}
          id='active'
        >
          <img src={bandGraphic} style={{background: band.color}} alt="error" />
          <p>{band['Event Name']}</p>
        </li>
      ))}
    </div>
  )
}