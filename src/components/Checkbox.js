import { useState } from "react"

const CheckBox = ({label, defaultCheck}) => {
    const[checked, setChecked] = useState(defaultCheck)
    
    return ( 
        <div className = "default-checkbox">
            <input 
                type="checkbox" 
                id="checkbox" 
                checked ={checked}
                onChange={() => {setChecked(!checked)}}
                />
            <label htmlFor="checkbox">{label}</label>
        </div>
     );
}
 
export default CheckBox;