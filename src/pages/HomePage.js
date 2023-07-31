//Component Imports
import Headbar from "../components/Headbar";
import { useAuthContext } from "../hooks/useAuthContext";

//Custom Hook Imports
import { useNavigate } from "react-router-dom";

import '../HomePage.css';
import '../nicepage.css';
import '../index.css'

import band1 from "../TropicalBand.png";
import band2 from "../OrangeYellowBand.png";
import band3 from "../PurpleRedBand.png";
import band4 from "../BlueGreenBand.png";
import phone from "../BANDPhone.png"

// import '../HomePage.css';
export default function UseHome() {
    const { user } = useAuthContext()
    const temp = user ? user:{email:" "}
    const navigate = useNavigate()
    return(
        <div className="homepage">
            <Headbar/>
            <script class="u-script" type="text/javascript" src="../jquery.js" defer=""></script>
            <script class="u-script" type="text/javascript" src="../nicepage.js" defer=""></script>
            <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i"/>
            <link id="u-page-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Archivo:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"/>
            <div className="u-body u-gradient u-xl-mode" style={{background: "linear-gradient('#478ac9', '#db545a')"}}>
                <section className="u-align-right u-clearfix u-palette-2-base u-section-1" id="sec-56d1">
                    <div className="u-clearfix u-sheet u-sheet-1">
                        <img className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-1" src={band1} alt="" data-image-width="1819" data-image-height="147"/>
                        <img className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-2" src={band2} alt="" data-image-width="1819" data-image-height="147"/>
                        <img className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-3" src={band3} alt="" data-image-width="1819" data-image-height="147"/>
                        <img className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-image u-image-default u-image-4" src={band4} alt="" data-image-width="1819" data-image-height="147"/>
                        <h1 className="u-align-left u-text u-text-1">Welcome to BAND Ticketing</h1>
                        <p className="u-align-left u-text u-text-body-alt-color u-text-2">Learn how BAND Ticketing can streamline wristbands for your next event</p> 
                    </div>
                </section>
                <section className="u-align-left u-clearfix u-white u-section-2" id="carousel_d381">
                    <div className="u-clearfix u-sheet u-valign-middle-xs u-sheet-1">
                        <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                        <div className="u-gutter-0 u-layout">
                            <div className="u-layout-row">
                            <div className="u-align-center u-container-style u-layout-cell u-size-26 u-white u-layout-cell-1">
                                <div className="u-container-layout u-valign-bottom-xs u-container-layout-1">
                                <h1 className="u-text u-text-black u-text-1">How It Works</h1>
                                <div className="u-list u-list-1">
                                    <div className="u-repeater u-repeater-1">
                                    <div className="u-container-style u-hover-feature u-list-item u-repeater-item u-shape-rectangle u-video-cover u-white u-list-item-1">
                                        <div className="u-container-layout u-similar-container u-container-layout-2">
                                        <h4 className="u-align-center u-text u-text-palette-4-base u-text-2">Create</h4>
                                        <p className="u-align-center u-custom-font u-text u-text-3">Create a BAND for your event. Set Date, Time, Location, and BAND Color</p>
                                        </div>
                                    </div>
                                    <div className="u-align-center u-container-style u-hover-feature u-list-item u-repeater-item u-shape-rectangle u-video-cover u-white u-list-item-2">
                                        <div className="u-container-layout u-similar-container u-container-layout-3">
                                        <h4 className="u-align-center u-text u-text-palette-4-base u-text-4">Invite</h4>
                                        <p className="u-align-center u-custom-font u-text u-text-5">Add attendees to your event by inviting them to the corresponding BAND</p>
                                        </div>
                                    </div>
                                    <div className="u-align-center u-container-style u-hover-feature u-list-item u-repeater-item u-shape-rectangle u-video-cover u-white u-list-item-3">
                                        <div className="u-container-layout u-similar-container u-container-layout-4">
                                        <h4 className="u-align-center u-text u-text-palette-4-base u-text-6">Verify</h4>
                                        <p className="u-align-center u-custom-font u-text u-text-7">At your event, use the verify feature to change the BAND color in real-time and check for a matching color change on the attendees' BAND</p>
                                        </div>
                                    </div>
                                    <div className="u-align-center u-container-style u-hover-feature u-list-item u-repeater-item u-shape-rectangle u-video-cover u-white u-list-item-4">
                                        <div className="u-container-layout u-similar-container u-container-layout-5">
                                        <h4 className="u-align-center u-text u-text-palette-4-base u-text-8">Enter</h4>
                                        <p className="u-align-center u-custom-font u-text u-text-9">Attendee then presses "Enter Event", displaying a confirmation screen and making the BAND inactive</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="u-container-style u-layout-cell u-size-34 u-layout-cell-2">
                                <div className="u-container-layout u-container-layout-6">
                                <div className="u-palette-2-base u-preserve-proportions u-shape u-shape-circle u-shape-1"></div>
                                <img src={phone} alt="" className="u-image u-image-default u-image-1" data-image-width="1200" data-image-height="1034"/>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <div className="bottom"/>
            </div>
        </div>
    )
    
}