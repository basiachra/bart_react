import React from "react";
import Card from "./Card";
import {Link} from "react-router-dom";

export class Gallery extends React.Component {

    contactToContactItem = (category,count) => {

        let  img;
        const name = category.gallery.name;
        const path = category.gallery.path;


        if(category.images !== undefined && category.images.length > 0){
            img =  category.images[0].name;}
        else
            img = "blanc.jpg";

        if(count === 1) count = " 1 fotka"
        else if(count > 1 && count < 5) count = `${count} fotky`
        else if(count > 4 || count === 0)count = `${count} fotiek`

        return <ContactItem name={name} type='photo' count={count} path={path} img={img} />;
    };

    contactToContactItem2 = category => {
        let path = "blanc.jpg";
        if(category!== undefined ) {
            if(category.name !== undefined)
                path = category.name;
            return <ContactItem  img={path} type='gallery'/>;
        }
        return null;
    };

    render() {
        if (this.props.type === 'gallery') {
            let count = 0;
            if(this.props.categories.images !== undefined) count=this.props.categories.images.length;
            return this.contactToContactItem(this.props.categories,count);//.map(this.contactToContactItem));
        }
        if (this.props.type === 'images') {
            const images = Array.from(this.props.categories.images)
            return images.map(this.contactToContactItem2)//(this.props.categories.images);
        }
        return null;
    };
}

export const ContactItem = ({ name, path, type, img,count}) => {
    if (type === 'photo') {
        return (
            <Link to={`./${path}`}>
                <Card type={type} name={name} path={path} count={count} img={img}/>
            </Link>
        );
    }
    if (type === 'gallery') {
        return <Card type={type} img={img}/>;
    }
};
