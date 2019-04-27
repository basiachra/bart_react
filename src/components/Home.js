import React from 'react'
import '../css/App.css'
import Card from './Card'
import Header from './Header'
import {Gallery} from "./Gallery";

import add from '../css/img/add_icon.svg'
import Button from "./Button";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state =
            {
                galleries: [],
                count: 0,
                img: [],
                ready:false,
                inputValue: '',
                api : "http://api.programator.sk"
            };
        this.createCard = this.createCard.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount = async() =>{

        await fetch(`${this.state.api}/gallery`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        galleries: result.galleries
                    });
                }
            );
        this.getImages(this.state.galleries)
    };

    getImages = async (imags) => {
        for (let i = 0; i < imags.length; i++) {
            if (imags[i].image !== undefined) {
                await fetch(`${this.state.api}/images/0x0/${imags[i].image.fullpath}`)
                    .then(res => {
                        return res;
                    })
                    .then(res => {
                            this.state.img.push(res.url);
                        }
                    );
            }
            else{
                this.state.img.push(require('../css/img/blanc.jpg'));
            }

            if(this.state.img.length === this.state.galleries.length){
                this.state.ready = true;
            }
            this.forceUpdate();
        }};


    addCard = async(name) =>{
        const resp = await fetch(`${this.state.api}/gallery`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"name": name})
            })

        this.state.galleries.push(resp.json());
        this.state.img.push(require('../css/img/blanc.jpg'));
        this.forceUpdate();
    }



     createCard(e) {
        e.preventDefault();
        const name = this.state.inputValue;

        if(typeof name === 'string' && name.length > 0) {
            this.addCard(name);
        }
    }


    render() {
        if(!this.state.ready){ return <div>Loading...</div>}
        else{
        return (
            <div className="content">
                <Header name="kategórie" img={require('../css/img/pexels-photo-261187.jpeg')}/>

                <div className="wrapper">
                    <div className="container-fluid" id="main">
                        <div className="row">
                            {
                                this.state.galleries.map((image,index) => (
                                    <Gallery categories={image} img={this.state.img[index]} key={index} type={'gallery'}/>
                                ))}
                            <div className="col-xl-3  col-lg-4  col-md-6 col-sm-6  ">
                                <Card type="new" name="category" msg="kategóriu"/>
                            </div>
                        </div>
                    </div>


                    <div id="modal_category" ref="CardForm" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <Button type="close"/>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Pridať kategóriu</h4>
                                </div>
                                <div className="modal-body--category">
                                    <input type="text" className="modal_add--cat" onChange={evt => this.setState({inputValue : evt.target.value})} placeholder="zadajte názov kategórie"/>
                                    <button type="button" className="btn-add" data-dismiss="modal" onClick={this.createCard}>
                                        <img className="right" src={add} alt="add"/>
                                        pridať
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="bart">webdesign bart.sk</p>
                </div>
            </div>
        )}
}}

export default Home;
