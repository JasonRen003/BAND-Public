import { db } from "../firebase/config"
import { doc, deleteDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrgList({orgs, query}) {

  const {user} = useAuthContext()
  const navigate = useNavigate()

  const handleClick = (org) => {
    navigate('/org', {state: org})
  }
  
  return (
    <div className="org-list">
      {orgs && orgs.filter((org) => {
        return query.toLowerCase() === '' ? org : org.email.toLowerCase().includes(query.toLowerCase())
      }).map((org) => (
        <li 
          key={org.email} 
          onClick={() => {handleClick(org)}}
          id='active'
        >
          <p>{org.email}</p>
        </li> 
      ))}
    </div>
  )
}