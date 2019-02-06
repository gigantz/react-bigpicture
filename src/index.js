import * as React from 'react';
import PropTypes from 'prop-types';
import BigPicture from './bigpicture.js';

class BigPictureWrapper extends React.Component {
	static defaultProps = {
		type: 'image'
	};

	constructor(props) {
		super(props);
		this.el = React.createRef();
	}

	zoomHandle = () => {
		const { type } = this.props;
		let options = {
			el: this.el.current
		};

		switch (type) {
			case 'image':
				options.imgSrc = this.props.src;
				break;
			case 'video':
				options.vidSrc = this.props.src;
				break;
			case 'youtube':
				options.ytSrc = this.props.src.split('=')[1];
				break;
			case 'vimeo':
				const pathComponents = this.props.src.split('/')
				options.vimeoSrc = pathComponents[pathComponents.length - 1];
				break;
			default:
				options.imgSrc = this.props.src;
				break;
		}

		BigPicture(options);
	};

	render() {
		return (
			<div
				className="bigpicture link picture"
				onClick={this.zoomHandle}
				ref={this.el}
				title={this.props.caption}
				style={{ display: 'inline-block' }}
			>
				{this.props.children}
			</div>
		);
	}
}

BigPictureWrapper.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string,
	type: PropTypes.string.isRequired
};

export default BigPictureWrapper;
