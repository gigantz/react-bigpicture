import React from 'react';
import { render } from 'react-dom';
import { BPicture, BVideo, BYoutube, BVimeo } from './component';

render(
    <div>
        <BPicture caption="Example of an optional caption." src="http://lorempixel.com/1200/700/sports/1">
            <img src="http://lorempixel.com/400/200/sports/1" />
        </BPicture>

        <BVideo src="http://www.html5videoplayer.net/videos/toystory.mp4">
            <img src="http://lorempixel.com/400/200/sports/2" />
        </BVideo>

        <BYoutube src="https://www.youtube.com/watch?v=TTAU7lLDZYU">
            <img src="http://lorempixel.com/400/200/sports/3" />
        </BYoutube>

        <BVimeo src="https://vimeo.com/119287310">
            <img src="http://lorempixel.com/400/200/sports/5" />
        </BVimeo>
    </div>,
  document.querySelector('#root')
);