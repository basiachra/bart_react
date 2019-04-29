import React from "react";
import '../css/App.css';
import close from "../css/img/close_icon.svg";

import add_category from '../css/img/add_category.svg';
import add_images from '../css/img/add_gallery.svg';

const Button = (props) => {

    if(props.type === "close"){
        return (
            <button type="button"  className="btn-close" data-dismiss="modal">
                <img className="right icon-big" src={close} alt="close"/>
                zavrieť
            </button>
        )
    }
    else if(props.type ==="new"){
        return(
                <button className="new_cat--button"  data-toggle="modal" data-target={"#modal_" + props.name}>
                        {
                            props.name === 'gallery' ?
                                <img className="icon-big" src={add_images} alt="add"/>
                                : <img className="icon-big" src={add_category} alt="add"/>}
                        Pridať {props.msg}
                </button>
        )
    }
};
export default Button


