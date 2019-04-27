import React from 'react';
import '../css/App.css';
import arrowRight from '../css/img/next_icon.svg';
import arrowLeft from '../css/img/prev_icon.svg';


export class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageIndex: 0,
            images: this.props.images,
            arrowNext: arrowRight,
            arrowPrev: arrowLeft
        }
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
    }

    componentWillMount(){
        document.addEventListener("keydown", this.keyDownHandler, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDownHandler, false);
    }

    keyDownHandler(event){
        if (event.keyCode === 39) {
            return this.nextSlide();
        }
        if (event.keyCode === 37) {
            return this.prevSlide();
        }
    }

    prevSlide = () => {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === 0;
        const index = resetIndex ? lastIndex : this.state.currentImageIndex - 1;
        this.setState({
            currentImageIndex: index
        })
    };
    nextSlide = () => {
        const lastIndex = this.state.images.length - 1;
        const resetIndex = this.state.currentImageIndex === lastIndex;
        const index = resetIndex ? 0 : this.state.currentImageIndex + 1;
        this.setState({
            currentImageIndex: index
        });
    };

    render() {
        const index = this.state.currentImageIndex;
        if(this.state.images[index] === undefined){ return null}
            return (
                <div className="carousel">
                    <img  className="carousel--icon carousel--icon_left" src={this.state.arrowPrev} onClick={this.prevSlide} alt="arrow-left"/>
                        <img className="carousel--image" key={index} src={this.state.images[index]} alt=" "/>
                    <img className="carousel--icon" src={this.state.arrowNext} onClick={this.nextSlide} alt="arrow-right"/>
                </div>
            );
    }
}