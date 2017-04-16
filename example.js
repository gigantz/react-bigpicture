import React from 'react';
import { render } from 'react-dom';
import { BPicture, BYoutube, BVimeo } from './index';

render(
    <div>
        <div>
            <BPicture caption="Example of an optional caption." src="http://loremflickr.com/800/600">
                <img src="http://loremflickr.com/320/240" />

            </BPicture>

            <BYoutube src="https://www.youtube.com/watch?v=gGQNXfmNHJg">
                <img src="http://loremflickr.com/320/240" />
            </BYoutube>

            <BVimeo src="https://vimeo.com/119287310">
                <img src="http://loremflickr.com/320/240" />
            </BVimeo>
        </div>
    </div>,
  document.querySelector('#root')
);