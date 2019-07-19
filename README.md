# react-bigpicture
React Lightbox Component based on BigPicture.js / Video and Image
<a href="https://codesandbox.io/s/m57mw5v7vp">Demo - CodeSandbox</a>


```
npm install react-bigpicture --save
```
OR

```
yarn add react-bigpicture
```

### Props
```javascript
<BigPicture
  src={'http://lorempixel.com/800/600/sports/1'}
  caption="Sport picture"
  type="image" // "video", "youtube", "vimeo", "iframe", "audio"
  noLoader
>
    <img src="http://lorempixel.com/400/200/sports/1" />
</BigPicture>
```
### Use Callbacks
```javascript
<BigPicture
  src={'http://lorempixel.com/800/600/sports/1'}
  caption="Sport picture"
  type="image" // "video", "youtube", "vimeo", "iframe", "audio"
  noLoader
  animationStart={callbackFn}
  animationEnd={callbackFn}
  onClose={callbackFn}
  onError={callbackFn}
  onChangeImage={callbackFn}
>
    <img src="http://lorempixel.com/400/200/sports/1" />
</BigPicture>
```


## Example
```javascript
import React from 'react';
import { render } from 'react-dom';
import BigPicture from "react-bigpicture";

render(
    <div>
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

        <BigPicture type="vimeo" src="https://vimeo.com/119287310">
            <img src="http://lorempixel.com/400/200/sports/5" />
        </BigPicture>
    </div>,
  document.querySelector('#root')
);
```

![horizontal with codes](https://camo.githubusercontent.com/d58922db18736731a116bc06b445cd203d1e7ad5/687474703a2f2f692e696d6775722e636f6d2f375436646e4e332e676966)

BigPicture by @henrygd https://github.com/henrygd/bigpicture
