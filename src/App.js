import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

//Components
import SignUp from './pages/Signup';
import Login from './pages/Login';
import UseHome from './pages/UseHome';
import CreateEvent from './pages/CreateEvent';
import SearchOrgs from './pages/SearchOrgs';
import Verify from './pages/Verify';
import Invite from './pages/Invite';
import Band from './pages/Band';
import BandHistory from './pages/BandHistory';
import InactiveBand from './pages/InactiveBand';
import HomePage from './pages/HomePage';
import EditBand from './pages/EditBand';
import Org from './pages/Org';

function App() {
  const{authIsReady } = useAuthContext()

  return (
    <div className="app">
    {authIsReady && (
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/userhome" element={<UseHome/>}/>
            <Route path="/create" element={<CreateEvent/>}/>
            <Route path="/search" element={<SearchOrgs/>}/>
            <Route path="/verify" element={<Verify/>}/>
            <Route path="/invite" element={<Invite/>}/>
            <Route path="/band" element={<Band/>}/>
            <Route path="/inactive" element={<InactiveBand/>}/>
            <Route path="/history" element={<BandHistory/>}/>
            <Route path="/edit" element={<EditBand/>}/>
            <Route path ="/org" element={<Org/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    )}
    </div>
    
  

  );
}

export default App;
