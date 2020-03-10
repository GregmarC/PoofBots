import React from 'react';
import robot from '../../../src/images/robot.png';
import '../../App.css';

const Landing = () => 
    (
        <div className="row">
                <div className="col s6 offset-s3 l2 offset-l5" style={{paddingTop: "20px"}}>
                    <img src={robot} alt="bot" className="circle responsive-img robotHomePic"/>
                </div>  
        </div>
        
    )


export default Landing;