import React from 'react';
import { render } from 'react-dom';
import { BPicture, BVideo, BYoutube, BVimeo } from './index';

render(
    <div>
        <BPicture caption="Example of an optional caption." src="http://loremflickr.com/800/600">
            <img src="http://loremflickr.com/320/240" />
        </BPicture>

        <BVideo src="http://www.html5videoplayer.net/videos/toystory.mp4">
            <button>Open mp4 video</button>
        </BVideo>

        <BYoutube src="https://www.youtube.com/watch?v=TTAU7lLDZYU">
            <button>Youtube video</button>
        </BYoutube>

        <BVimeo src="https://vimeo.com/119287310">
            <img src="http://loremflickr.com/320/240" />
        </BVimeo>
    </div>,
  document.querySelector('#root')
);