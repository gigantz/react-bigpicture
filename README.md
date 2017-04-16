# react-bigpicture
React Lightbox Component based on BigPicture.js / Video and Image

```
npm install react-bigpicture --save
```


```javascript
import React from 'react';
import { render } from 'react-dom';
import { BPicture, BVideo, BYoutube, BVimeo } from './app';

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
```

![horizontal with codes](https://camo.githubusercontent.com/d58922db18736731a116bc06b445cd203d1e7ad5/687474703a2f2f692e696d6775722e636f6d2f375436646e4e332e676966)

BigPicture by @henrygd https://github.com/henrygd/bigpicture
