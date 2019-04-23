import React from 'react'
import {Link} from 'react-router-dom'
import Header from "./Header";
import Card from "./Card";
import Button from "./Button";
import ReactDropzone from "react-dropzone";
import {Gallery} from "./Gallery";
import {Carousel} from "./Carousel";

import add from '../css/img/add_icon.svg';
import add_images from '../css/img/add_gallery.svg';
import back from '../css/img/back_icon.svg';


class collection extends React.Component {
    constructor(props){
        super(props);

        this.createCard = this.createCard.bind(this);
        this.firstCard= this.firstCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state =
            {
                isLoaded: false,
                name : props.match.params.name,
                selectedFiles: [],
                galleries: []
            };
    }
    componentDidMount() {
        fetch(`http://localhost:3200/gallery/${this.state.name}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        galleries: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };
    handleChange = event =>
    {
        this.setState({selectedFiles : event.target.files});
    }
    addCard(fd ) {
            fetch(`http://localhost:3200/gallery/${this.state.name}`, {
            method: 'post',
            body: fd
        }).then(function(response) {
            return response;
        });

        const gal = {name: this.state.name, path:this.state.name}
        this.state.galleries.push(...[{gallery: gal, images: this.state.selectedFiles}])
        this.forceUpdate();
    }

    createCard(e) {
        e.preventDefault();

        const fd = new FormData();
        let l =0;
        while(this.state.selectedFiles.length > l){
              fd.append('image[]',this.state.selectedFiles[l]);
              fd.append('filename[]',this.state.selectedFiles[l].name);
              fd.append('gallery[]',`${this.state.name}`);
            l++;
        }
        this.addCard(fd)
    }

    firstCard(){
        if(this.state.galleries[0].images.length > 0){
            return this.state.galleries[0].images[0].name
        }
        return "blanc.jpg";
    }

    onDrop = (files) => {
        this.setState({selectedFiles : files});
    };

    render() {
        if(!this.state.isLoaded){ return <div>Loading...</div>}
        else{
        return(
            <div>
                <Header name={
                    <Link to={`./`} style={{ textDecoration: 'none', color: 'white' }}>
                        <img className="right" src={back} alt="back"/>
                        {this.state.name}
                    </Link>
                }   img={'uploads/' + this.firstCard(this.state.name)}/>
                <div className="wrapper">
                    <div className="container-fluid" id="main">
                        <div className="row">
                            {
                                this.state.galleries.map((image) => (
                                    <Gallery name={this.state.name} categories={image} type='images'/>))
                            }

                            <Card type="new" name="gallery" msg="fotky"/>
                        </div>
                    </div>
                    <p className="bart">webdesign bart.sk</p>
                </div>


                <div id="modal_gallery" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <Button type="close"/>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Pridať fotky</h4>
                            </div>

                            <ReactDropzone onDrop={this.onDrop}>
                                {({getRootProps, getInputProps}) =>{
                                    return(
                                        <div className="modal-body--gallery" {...getRootProps()}>
                                            <img className="right" src={add_images} alt="add"/>
                                            <p className="modal_text--gallery drop-active">Sem presunte fotky<br/> <span>alebo</span></p>
                                            <input {...getInputProps()} type="file" id="file" className="modal_add--gallery" multiple  onChange={this.handleChange}/>
                                            <label htmlFor="file">vyberte súbory</label>
                                        </div>
                                    );
                                }}
                            </ReactDropzone>
                            <div className="modal-footer">
                                <button type="button" className="btn-add" data-dismiss="modal" onClick={this.createCard}>
                                    <img className="right" src={add} alt="add"/>
                                    pridať
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="modal_image" className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        <Button type="close"/>
                        <div className=" modal-carousel">
                           <Carousel images={this.state.galleries[0].images} />
                        </div>
                    </div>
                </div>
            </div>
        );}
    };
};
export default collection
