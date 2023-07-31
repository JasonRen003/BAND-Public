//Firebase Imports
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCreate = (datetime, eventName, eventPrice, eventLoc, user, color) => {

    const create = async () => {
        console.log("CAKKED?")
        var dateObj = new Date()
        //Setting Date Object
        dateObj.setDate(datetime.$D)
        dateObj.setFullYear(datetime.$y)
        dateObj.setMonth(datetime.$M)
        dateObj.setTime(datetime.$H)
        dateObj.setMinutes(datetime.$m)

        await addDoc(collection(db, `users/${user.email}/created`), {
            'Event Name':eventName,
            Price: parseInt(eventPrice),
            Location: eventLoc,
            creator: user.email,
            color: color.hex,
            date: dateObj
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
            //         date: dateObj
            //     })
            // }
        })    
    }

    return create
    
}