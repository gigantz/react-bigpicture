import React from 'react';
import { render } from 'react-dom';
import BigPicture from './BigPictureComponent';

render(
	<React.Fragment>
		<BigPicture
      type="image"
      caption="Example of an optional caption."
      src="http://lorempixel.com/1200/700/sports/1"
    >
			<img src="http://lorempixel.com/400/200/sports/1" />
		</BigPicture>

    <BigPicture
      type="video"
      src="http://www.html5videoplayer.net/videos/toystory.mp4"
    >
			<img src="http://lorempixel.com/400/200/sports/2" />
		</BigPicture>

    <BigPicture
      type="youtube"
      src="https://www.youtube.com/watch?v=TTAU7lLDZYU"
    >
			<img src="http://lorempixel.com/400/200/sports/3" />
		</BigPicture>

    <BigPicture
      type="vimeo"
      src="https://vimeo.com/119287310"
    >
			<img src="http://lorempixel.com/400/200/sports/5" />
		</BigPicture>
	</React.Fragment>,
	document.querySelector('#root')
);
