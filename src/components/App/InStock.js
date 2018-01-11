import React from 'react';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Config from '../../Config';
import $ from 'jquery';
import ReactGA from 'react-ga';

ReactGA.initialize(Config.gaTrackingId);

class InStock extends React.Component {
    constructor() {
        super();
        this.state = { currentImage: 0 };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.state.photos = [];
        this.getPhotos();
    }

    componentDidMount() {
        ReactGA.pageview(window.location.href);
    }

    getPhotos() {
        $.getJSON(Config.apiHost + '/photos')
            .then(( results ) => { this.setState({ photos: results }); console.log(results); })
    }
    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    render() {
        return (
            <div>
                <Gallery photos={this.state.photos} onClick={this.openLightbox} />
                <Lightbox images={this.state.photos}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          currentImage={this.state.currentImage}
                          isOpen={this.state.lightboxIsOpen}
                />
            </div>
        )
    }
}

export default InStock;
