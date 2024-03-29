import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

//Firebase Imports
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (c, _q) => {
    const [documents, setDocuments] = useState(null)
    //set up query
    const q = useRef(_q).current
    useEffect(() => {
        let ref = collection(db, c)

        if(q){
            ref = query(ref, where(...q))
        }

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => { 
                results.push({id: doc.id, ...doc.data() })    
            })                
            const sortedBands = [...results].sort((a,b) => { 
                if(a['Event Name'] != null){
                    return (a['Event Name']).localeCompare(b['Event Name']) 
                }
            })
            setDocuments(sortedBands)
        })

        return() => {
            unsub()
        }
    }, [c,q])

    return {documents}
}