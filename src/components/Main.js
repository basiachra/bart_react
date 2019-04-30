import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Collection from './Collection'
import Header from "./Header";

class Main extends React.Component {

    shouldComponentUpdate(){
        return false;
    }
    constructor(props) {
        super(props);
        this.state =
            {
                galleries: [],
                galleryNames: [],
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
                        galleryNames: result.galleries
                    });
                }
            );

        this.getFirstImages(this.state.galleryNames)
        this.getImages(this.state.galleryNames)
    };

    getFirstImages = async (imags) => {
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

            if (this.state.img.length === this.state.galleryNames.length) {
                this.state.ready = true;
                this.forceUpdate();
            }
        }
    };

    getImages = async(galleries) => {
        for (let i = 0; i < galleries.length; i++) {
            await fetch(`${this.state.api}/gallery/${galleries[i].path}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.state.galleries.push(result)
                        },
                    (error) => {
                        this.setState({
                            error
                        });
                    }
                );
            this.state.galleryNames[i].count = this.state.galleries[i].images.length
        }
    };

    render() {
        if (!this.state.ready) {
            return (
                <div>
                    <Header name="kategórie" img={require('../css/img/pexels-photo-261187.jpeg')}/>
                    <div className="loadingDiv">
                        <p className={"loading"} >Downloading content</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <main>
                    <Switch>
                        <Route exact path='/' component={(props) => <Home {...props} galleries={this.state.galleryNames} img={this.state.img}/>}/>
                        <Route exact path='/:name'
                               component={(props) => (
                                   <Collection {...props}  galleries={this.state.galleries}/>
                               )}/>
                    </Switch>
                </main>
            );
        }
    }
}

export default Main
