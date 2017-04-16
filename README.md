# react-bigpicture
React Lightbox Component based on BigPicture.js / Video and Image

```
npm install react-bigpicture --save
```


```javascript
import React from 'react';
import { render } from 'react-dom';
import { BPicture, BYoutube, BVimeo } from './index';

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
```

![horizontal with codes](https://camo.githubusercontent.com/d58922db18736731a116bc06b445cd203d1e7ad5/687474703a2f2f692e696d6775722e636f6d2f375436646e4e332e676966)

BigPicture by @henrygd https://github.com/henrygd/bigpicture
