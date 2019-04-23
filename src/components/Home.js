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
                img: "img/pexels-photo-261187.jpeg",
                inputValue: ''
            };
        this.createCard = this.createCard.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:3200/gallery`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        galleries: result
                    });
                }
            );

    };

    addCard(path, name) {
        const gal = {path:path, name:name};
        fetch('http://localhost:3200/gallery', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(gal)
            }).then(function(response) {
                 return response.json();
            });

        this.state.galleries.push({gallery: {path : path, name : name}});
        this.forceUpdate();
    }

     createCard(e) {
        e.preventDefault();
        const name = this.state.inputValue;

        if(typeof name === 'string' && name.length > 0) {
            this.addCard(name,name);
        }
    }


    render() {
        if(!this.state.isLoaded){ return <div>Loading...</div>}
        else{
        return (
            <div>
                <Header name="kategórie" img={this.state.img}/>

                <div className="wrapper">
                    <div className="container-fluid" id="main">
                        <div className="row" id="row">
                            {
                                this.state.galleries.map((image) => (
                                    <Gallery categories={image} type={'gallery'}/>
                                ))}
                            <Card type="new" name="category" msg="kategóriu"/>
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
