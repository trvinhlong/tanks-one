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
        this.state = { currentImage: 0, selectedKeyword: '', photos: [], displayedPhotos: [] };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.getPhotoByKeyword = this.getPhotoByKeyword.bind(this)
        this.getAllPhotos();
        this.manufactures = [
            {label: 'Trumpeter', keyword: 'trumpeter'},
            {label: 'Tamiya', keyword: 'tamiya'},
            {label: 'Dragon', keyword: 'dragon'},
            {label: 'Italeri', keyword: 'italeri'},
            {label: 'Zvezda', keyword: 'zvezda'}
        ];
        this.cats = [
            {label: 'Mô hình xe tăng, pháo binh', keyword: 'tank'},
            {label: 'Mô hình tàu chiến', keyword: 'ship'},
            {label: 'Mô hình lính', keyword: 'soilder'},
            {label: 'Mô hình giả tưởng', keyword: 'robot'},
        ];
    }

    generateLinks(links) {
        var generatedLinks =  links.map(link => {
            return (<li className={this.state.selectedKeyword === link.keyword ? "selected-keyword" : ""}><a href="#" onClick={e => {this.getPhotoByKeyword(link.keyword)}}>{link.label}</a></li>)
        });
        return (<ul><li><a href="#" onClick={e => {this.getAllPhotos()}}>Xem toàn bộ</a></li>{generatedLinks}</ul>)
    }

    componentDidMount() {
        ReactGA.pageview(window.location.href);
    }

    getAllPhotos() {
        this.setState({selectedKeyword: ""});
        $.getJSON(Config.apiHost + '/photos')
            .then(( results ) => { this.setState({ photos: results, displayedPhotos: results }); console.log(results); })
    }

    getPhotoByKeyword(keyword) {
        this.setState({
            selectedKeyword: keyword,
            displayedPhotos: [...this.state.photos].filter(photo => photo.name.includes(keyword))
        });
    //     $.getJSON(Config.apiHost + '/photos/' + keyword)
    //         .then(( results ) => { this.setState({ photos: results }); console.log(results); })
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }
    render() {
        return (
            <div>
                <div>{this.generateLinks(this.cats)}</div>
                <hr />
                <div>{this.generateLinks(this.manufactures)}</div>
                <Gallery photos={this.state.displayedPhotos} onClick={this.openLightbox} />
                <Lightbox images={this.state.displayedPhotos}
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
