import React from 'react'
import '../css/App.css';

const Header = (props) => {
    return (
        <div id="header">
        <div className="header">
            <div className="header_blurred" id="main_photo">
                <img src={require('../css/' + props.img )} alt="backgroundImage" className=" img-responsive header_blurred--img"/>
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