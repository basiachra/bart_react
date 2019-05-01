import React from 'react'

const Header = (props) => {
    let img;

    if(props.img === undefined) img = require('../css/img/blanc.jpg');
    else img = props.img;

    return (
        <div id="header">
        <div className="header">
            <div className="header_blurred" id="main_photo">
                <img src={ img } alt="backgroundImage" className=" img-responsive header_blurred--img"/>
            </div>
            <div className="header_opacity">
                <div className="header_text">
                    <h2 className="main">Fotogaléria</h2>
                    <h3 className="page_title">{props.name}</h3>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Header;