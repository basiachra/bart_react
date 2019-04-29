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
                galleries: this.props.galleries,
                count: 0,
                img: this.props.img,
                inputValue: '',
                api : "http://api.programator.sk"
            };
        this.createCard = this.createCard.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    addCard = async(name) =>{
        const resp = await fetch(`${this.state.api}/gallery`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({"name": name})
            })

        console.log(resp);
        this.state.galleries.push({path: name ,name : name});
        this.state.img.push(require('../css/img/blanc.jpg'));
        this.setState(this.state);
    }

     createCard(e) {
        e.preventDefault();
        const name = this.state.inputValue;

        if(typeof name === 'string' && name.length > 0) {
            this.addCard(name);
        }
    }

    render() {
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
}//}

export default Home;
