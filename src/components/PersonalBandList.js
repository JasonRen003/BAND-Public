import { db } from "../firebase/config"
import { doc, deleteDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bandGraphic from "../LightBand.png";

export default function PersonalBandList({bands}) {

  const {user} = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    var currentDateTime = new Date()
    bands.forEach(async band => {
      var bandDateTime = new Date(band.date.seconds * 1000)
      if((currentDateTime - bandDateTime) / 36e5 > 3){ //BAND active for up to 3 hours after set time
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
      }
    })
    
  }, [bands, user.email])

  const handleClick = (band) => {
    navigate('/band', {state: band})
  }

  useEffect(() => {
    let unsubList = []
    bands.map(async (band) => {
      const unsub = onSnapshot(doc(db, `users/${band.creator}/created`, band.id), async (docRef) => {
        if(docRef.data()){
          const personalDocRef = doc(db, `users/${user.email}/purchased`, band.id)
          const data = {
            color: docRef.data().color
          }
          console.log("Personal Band List Listener Started")
          updateDoc(personalDocRef,data)
            .then(personalDocRef => {
                console.log("Updated Color")
            })
            .catch(error => {
                console.log(error);
            })    
          };
        }
      )
      unsubList.push(unsub)
    })
    return() => {
      unsubList.forEach(unsub => {
        console.log("Unsubbing")
        unsub()
      })
    }
  }, [bands, user.email])

  return (
    <div className="band-list">
      {bands.map((band) => (
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