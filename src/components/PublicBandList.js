// import { db } from "../firebase/config";
// import { doc, setDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";

// import { useEffect } from "react";

// function PublicBandList({ bands }) {
//   const navigate = useNavigate()
//   const { user } = useAuthContext()

//   useEffect(() => {
//     var currentDateTime = new Date()
//     bands.forEach(async band => {
//       var bandDateTime = new Date(band.date.seconds * 1000)
//       if((currentDateTime - bandDateTime) / 36e5 > 3){
//         const publicRef = doc(db, 'Public BANDs', band.id)
//         await deleteDoc(publicRef)
//       }
//     })
    
//   }, [bands])

//   const handleClick = async (band) => {
//     var bandDoc = doc(db, `users/${band.creator}/created/${band.id}`)
//     await updateDoc(bandDoc, {
//         attendees: arrayUnion(user.email)
//     })
//     var bandDoc2 = doc(db, `Public BANDs/${band.id}`)
//     await updateDoc(bandDoc2, {
//         attendees: arrayUnion(user.email)
//     })
//     // await setDoc(doc(db, `Public BANDs/${band.id}/attendees`, `${user.email}`), {
//     //     uid: user.uid,
//     //     email: user.email,
//     // });
//     // console.log(band)
//     // await setDoc(doc(db, `users/${band.creator}/created/${band.id}/attendees`, user.email), {
//     //   uid: user.uid,
//     //   email: user.email,
//     // });
//     await setDoc(doc(db, `users/${user.email}/purchased`, band.id), {
//         'Event Name': band['Event Name'],
//         Price: band.Price,
//         Public: band.Public,
//         creator: band.creator,
//         color: band.color,
//         date: band.date
//     })
//     console.log("Added to Account") 
//   }

//   const routeChange = () => {
//     let path = "/login"
//     navigate(path)
//   }

//     return (
//       <div className="band-list">
//         <ul>
//           {bands.map(band => (
//             <li key={band.id} onClick={() => {user ? handleClick(band) : routeChange()}}>{band['Event Name']}: ${band['Price']}</li>
//           ))}
//         </ul>
//       </div>
//     )
//   }

// export default PublicBandList;