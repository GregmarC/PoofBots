import React from 'react';
import './clientChatBot.css';

const Card2 = (props) => {
    return(
        <div style={{float: 'left', paddingRight: 30, width: 270, marginLeft: "1vw"}}>
            <div className="poofCard card">
                <div className="poofCardImage card-image" style={{ width: 240 }}>
                    <img alt={props.payload.header} src={props.payload.imageUri} />
                    <span className="poofProductTitle card-title">{props.payload.title}</span>
                </div>
                {/* <div className="card-content">
                    {props.payload.description}
                    <p> <a href="/">{props.payload.price}</a></p>
                </div>
                <div className="card-action">
                    <a target="_blank" rel="noopener noreferrer" href={props.payload.link}>GET NOW</a>
                </div> */}
            </div>
        </div>
    );
};

export default Card2;
