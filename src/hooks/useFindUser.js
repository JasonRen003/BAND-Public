import { useAuthContext } from './useAuthContext';

//firebase imports
import { db } from "../firebase/config";
import { setDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore';

export const useFindUser = () => {
    const { user } = useAuthContext()
    const finder = async (email, band, id) => {
        var bandDoc = doc(db, `users/${user.email}/created/${id}`)
        await updateDoc(bandDoc, {
            attendees: arrayUnion(email)
        })
        var userDoc = doc(db, `users/${email}/purchased`,id)
        await setDoc(userDoc, {
            "Event Name": band['Event Name'],
            Price: band.Price,
            Location: band.Location,
            color: band.color,
            creator: band.creator,
            date: band.date
        })
    }
    
    return {finder}
}