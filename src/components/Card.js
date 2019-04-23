import React from "react";
import '../css/App.css';
import Button from "./Button";

const Card = (props) => {

    if(props.type === "gallery"){
        return (
            <div className="col-lg-3  col-md-4 col-sm-6">
                <div className="card" >
                    <div className={"card_" + props.type} data-toggle="modal" data-target={"#modal_image"}>
                        <img src={require('../css/uploads/' + props.img )} alt="GalleryPhoto" className={"cover"} />
                    </div>
                </div>

            </div>
        )
    }
    else if(props.type === "photo"){
        return (
            <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="card">
                    <div className={"card_" + props.type }>
                        <img src={require('../css/uploads/' +props.img )} alt="GalleryPhoto" className={"cover"}/>
                        }}/>
                    </div>
                    <div className="card_title">
                        <h4 className="cat_name">{props.name}</h4>
                        <p className="photo_count">{props.count}</p>
                    </div>
                </div>
            </div>
        )
    }
    else if(props.type ==="new"){
        return(
            <div className="col-lg-3  col-md-4 col-sm-6">
                <div className="card_new">
                    <Button type="new" name={props.name}/>
                </div>
            </div>
        )
    }
};
export default Card
