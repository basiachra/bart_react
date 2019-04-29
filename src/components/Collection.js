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

class Collection extends React.Component {
    constructor(props){
        super(props);

        this.createCard = this.createCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getImages = this.getImages.bind(this);
        this.state =
            {
                //isLoaded: false,
                ready: false,
                name : props.match.params.name,
                selectedFiles: [],
                galleries: [],
                images: [],
                api: "http://api.programator.sk",
                apiImg: "http://api.programator.sk/images/0x0"
            };
    }
    componentDidMount = async() =>{
        await fetch(`${this.state.api}/gallery/${this.state.name}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                       // isLoaded: true,
                        galleries: result
                    });
                },
                (error) => {
                    this.setState({
                        //isLoaded: true,
                        error
                    });
                }
            );
        if(this.state.galleries.images !== undefined)
            this.getImages(this.state.galleries.images)
    };

    getImages = async (imags) => {

        for (let i = 0; i < imags.length; i++) {

             await fetch(`${this.state.api}/images/0x0/${imags[i].fullpath}`)
                    .then(res => {return res; })
                    .then(res => {
                            this.state.images.push(res.url);
                        }
                    );
        }
        this.state.ready = true;
        this.setState(this.state);
    };

    handleChange = event =>
    {
        this.setState({selectedFiles : event.target.files});
    };

    addCard = async(fd,name) => {
        const res = await fetch(`${this.state.api}/gallery/${this.state.name}`, {
            method: 'post',
            body: fd
        }).then(function(response) {
            console.log( response);
        });
        console.log(res)
        this.state.images.push(`${this.state.apiImg}/${this.state.name}/${name}`)

        console.log(this.state.images)
        this.setState(this.state);
    }

    createCard(e) {
        e.preventDefault();
        let l = 0;
        while(this.state.selectedFiles.length > l){
            const fd = new FormData();
            fd.append('file',this.state.selectedFiles[l]);

            this.addCard(fd,this.state.selectedFiles[l].name)
            l++;
         }
    };

    onDrop = (files) => {
        this.setState({selectedFiles : files});
    };

    render() {
        if (!this.state.ready) {
            return <div>Downloading images</div>
        }
        else {
            console.log(this.state.images)
            return (
                <div className="content">
                    <Header name={
                        <Link to={`./`} style={{textDecoration: 'none', color: 'white'}}>
                            <img className=" icon right" src={back} alt="back"/>
                            {this.state.name}
                        </Link>
                    } img={this.state.images[0]}/>
                    <div className="wrapper">
                        <div className="container-fluid" id="main">
                            <div className="row">
                                {
                                    this.state.images.map((image, index) => (
                                        <Gallery name={this.state.name} categories={image} key={index} type='images'/>))
                                }
                                    <Card type="new" name="gallery" msg="fotky"/>
                            </div>
                        </div>
                        <p className="bart">webdesign bart.sk</p>



                    <div id="modal_gallery" className="modal fade" role="dialog" tabIndex="-1">
                        <div className="modal-dialog">
                            <Button type="close"/>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Pridať fotky</h4>
                                </div>

                                <ReactDropzone onDrop={this.onDrop}>
                                    {({getRootProps, getInputProps}) => {
                                        return (
                                            <div className="modal-body--gallery" {...getRootProps()}>
                                                <img className="right icon-big" src={add_images} alt="add"/>
                                                <p className="modal_text--gallery drop-active">Sem presunte fotky<br/>
                                                    <span>alebo</span></p>
                                                <input {...getInputProps()} type="file" id="file"
                                                       className="modal_add--gallery" multiple
                                                       onChange={this.handleChange}/>
                                                <label htmlFor="file">vyberte súbory</label>
                                            </div>
                                        );
                                    }}
                                </ReactDropzone>
                                <div className="modal-footer">
                                    <button type="button" className="btn-add" data-dismiss="modal"
                                            onClick={this.createCard}>
                                        <img className="right icon" src={add} alt="add"/>
                                        pridať
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div id="modal_image" className="modal fade" role="dialog" tabIndex="-1">
                            <div className="modal-dialog">
                                <Button type="close"/>
                                <div className="modal-content modal-content--carousel">
                                    <Carousel images={this.state.images} index={this.state.index}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }};
}
export default Collection

