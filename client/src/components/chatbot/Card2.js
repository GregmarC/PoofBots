import React from 'react';

const Card2 = (props) => {
    return(
        <div style={{float: 'left', paddingRight: 30, width: 270}}>
            <div className="card">
                <div className="card-image" style={{ width: 240 }}>
                    <img alt={props.payload.header} src={props.payload.imageUri} />
                    <span className="card-title">{props.payload.title}</span>
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
