import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigPicture from './bigpicture';

export class BPicture extends Component {
    constructor(props){
        super(props);
    }

    zoomHandle = () => {
        BigPicture({
            el: this.refs.link,
            imgSrc: this.props.src
        });
    }

    render(){
        return (
            <div className="bigpicture link picture" onClick={this.zoomHandle} ref="link" title={this.props.caption} style={{ display: 'inline-block' }}>
                {this.props.children}
            </div>
        )
    }
}

BPicture.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string
};

export class BYoutube extends Component {
    constructor(props){
        super(props);
    }

    zoomHandle = () => {
        BigPicture({
            el: this.refs.link,
            ytSrc: this.props.src.split('=')[1]
        });
    }

    render(){
        return (
            <div className="bigpicture link video" onClick={this.zoomHandle} ref="link" title={this.props.caption} style={{ display: 'inline-block' }}>
                {this.props.children}
            </div>
        )
    }
}

BYoutube.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string
};

export class BVimeo extends Component {
    constructor(props){
        super(props);
    }

    zoomHandle = () => {
        let vimeoID = this.props.src.split('/');
        BigPicture({
            el: this.refs.link,
            vimeoSrc: vimeoID[vimeoID.length-1]
        });
    }

    render(){
        return (
            <div className="bigpicture link video" onClick={this.zoomHandle} ref="link" title={this.props.caption} style={{ display: 'inline-block' }}>
                {this.props.children}
            </div>
        )
    }
}

BVimeo.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string
};
