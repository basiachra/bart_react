import React from "react";
import Card from "./Card";
import {Link} from "react-router-dom";

export class Gallery extends React.Component {

    cardItem = (categories, url, index) => {
        if(url === undefined)
            url = "blanc.jpg";
       /* if(count === 1) count = " 1 fotka"
        else if(count > 1 && count < 5) count = `${count} fotky`
        else if(count > 4 || count === 0)count = `${count} fotiek`*/

        return <CardItem name={categories.name} path={categories.path} key={index} type='photo' img={url} />;
    };

    cardItem2 = (url, name, index) => {
        let path;
        if(url !== undefined) path = url;
        else path = "blanc.jpg";
        return <CardItem name={name} key={index} type='gallery' img={path}/>;
    };

    render() {
        if (this.props.type === 'gallery') {
            return this.cardItem(this.props.categories, this.props.img);
        }

        if (this.props.type === 'images') {
            return this.cardItem2(this.props.categories, this.props.name)
        }
        return null;
    };
}

export const CardItem = ({ name, type, img, path,click}, key) => {
    if (type === 'photo') {
        return (
            <div className="col-xl-3  col-lg-4  col-md-6 col-sm-6  ">
            <Link to={`./${path}`}>
                <Card type={type} name={name} img={img} key={key} />
            </Link>
            </div>
        );
    }
    if (type === 'gallery') {
        return (
            <div className="col-xl-3  col-lg-4  col-md-6 col-sm-6 ">
            <Card type={type} name={name} img={img} key={key}/>
            </div>
        );
    }
};
