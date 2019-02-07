import * as React from 'react';
import PropTypes from 'prop-types';
import BigPicture from './bigpicture.js';

class BigPictureWrapper extends React.Component {
	static defaultProps = {
		type: 'image',
	};

	constructor(props) {
		super(props);
		this.el = React.createRef();
	}

	zoomHandle = () => {
		const { type, src } = this.props;
		let options = {
			el: this.el.current,
		};

		switch (type) {
			case 'image':
				options.imgSrc = src;
				break;
			case 'video':
				options.vidSrc = src;
				break;
			case 'youtube':
				options.ytSrc = src.split('=')[1];
				break;
			case 'vimeo':
				options.vimeoSrc = src.replace(/https\:\/\/vimeo\.com\//, '');
				break;
			default:
				options.imgSrc = src;
				break;
		}

		BigPicture(options);
	};

	render() {
		const {
			caption,
			children,
			className,
			style,
			onClick,
			...rest
		} = this.props;
		return (
			<div
				className={`bigpicture link picture ${className || ''}`}
				onClick={() => {
					if (onClick) onClick();
					this.zoomHandle();
				}}
				ref={this.el}
				title={caption || ''}
				style={{ display: 'inline-block', ...style }}
				{...rest}
			>
				{children}
			</div>
		);
	}
}

BigPictureWrapper.propTypes = {
	src: PropTypes.string.isRequired,
	caption: PropTypes.string,
	type: PropTypes.oneOf([ 'image', 'video', 'youtube', 'vimeo' ]).isRequired,
	onClick: PropTypes.func,
	style: PropTypes.object,
	className: PropTypes.string,
};

export default BigPictureWrapper;
