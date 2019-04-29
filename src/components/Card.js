import React from "react";
import '../css/App.css';
import Button from "./Button";

const Card = (props) => {

    if(props.type === "gallery"){
        return (

                <div className="card" >
                    <div className={"card_" + props.type}  data-toggle="modal" data-target={"#modal_image"}>
                        <img src={props.img} alt={props.name} className={"cover"} />
                    </div>
                </div>

        )
    }
    else if(props.type === "photo"){
        return (

                <div className="card">
                    <div className={"card_" + props.type }>
                        <img src={props.img} alt="GalleryPhoto" className={"cover"}/>
                    </div>
                    <div className="card_title">
                        <h4 className="cat_name">{props.name}</h4>
                        <p className="photo_count">{props.count}</p>
                    </div>
                </div>

        )
    }
    else if(props.type ==="new"){
        return(
            <div className="col-xl-3  col-lg-4  col-md-6 col-sm-6 ">
                <div className="card card_new ">
                    <Button type="new" name={props.name}/>
                </div>
            </div>
        )
    }
};
export default Card
