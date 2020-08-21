import React from 'react';
import './clientChatBot.css';
import amazonLogo from './images/amazonLogo.png';

const Card2 = (props) => {
    return(
        <div className="productCard2" style={{marginLeft: "1vw"}}>
            <div className="poofCard card row">
                <div className="poofCardImage card-image col l4">
                    <img className="poofCardImage2" alt={props.payload.header} src={props.payload.imageUri} />
                </div>
                <div className="cardContentContainer col l4">
                    <div className="poofProductTitle">{props.payload.title}</div>
                    <div className="poofPrice3">{`$${props.payload.subtitle}`}</div>
                    <div className="sourceLogoImg">
                        <a href={`${props.payload.buttons[0].postback}`}  target="_blank"><img className="logoImg img-fluid" src={amazonLogo} alt={props.payload.buttons[0].text}/></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card2;
