//Component Imports
import Headbar from "../components/Headbar";
import PublicBandList from "../components/PublicBandList";

//Custom Hook Imports
import { useCollection } from "../hooks/useCollection";

export default function ExploreEvents() {
    
    const {documents: bands} = useCollection('Public BANDs')

    return(
        <div className="explore">
        <Headbar/>
            <h1>Explore Public Events</h1>
            <div className="public-events">
                {bands && <PublicBandList bands={bands}/>}
            </div>
        </div>
    )
    
}