import React from 'react';
import robot from '../../../src/images/robot.png';
import '../../App.css';

const Landing = () => 
    (
        <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "25px"}}>
                <div className="col s4 m2 l2" style={{marginLeft: "unset", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={robot} alt="bot" className="circle responsive-img robotHomePic"/>
                </div>  
        </div>
        
    )


export default Landing;