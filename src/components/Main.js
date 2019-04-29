import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Collection from './Collection'

class Main extends React.Component {

    shouldComponentUpdate(){
        return false;
    }
    constructor(props) {
        super(props);
        this.state =
            {
                galleries: [],
                count: 0,
                img: [],
                ready: false,
                inputValue: '',
                api: "http://api.programator.sk"
            };
    }

    componentDidMount = async () => {

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
            else {
                this.state.img.push(require('../css/img/blanc.jpg'));
            }

            if (this.state.img.length === this.state.galleries.length) {
                this.state.ready = true;
                this.forceUpdate();
            }

           // this.setState(this.state);
        }
    };


    render() {
        if (!this.state.ready) {
            return <div>Loading...</div>
        }
        else {
            return (
                <main>
                    <Switch>
                        <Route exact path='/' component={() => <Home galleries={this.state.galleries} img={this.state.img}/>}/>
                        <Route exact path='/:name' component={Collection}/>
                    </Switch>
                </main>
            );
        }
    }
}


export default Main
