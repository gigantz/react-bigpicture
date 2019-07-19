import React, { useRef } from "react";
import PropTypes from "prop-types";

import BigPicture from "bigpicture";

const BigPictureWrapper = ({
  type = "image",
  src,
  caption,
  children,
  className,
  style,
  onClick,
  animationStart,
  animationEnd,
  onClose,
  onError,
  onChangeImage,
  noLoader,
  ...rest
}) => {
  const elRef = useRef(null);
  const zoomHandle = () => {
    let options = {
      el: elRef.current
    };

    switch (type) {
      case "image":
        options.imgSrc = src;
        break;
      case "video":
        options.vidSrc = src;
        break;
      case "youtube":
        options.ytSrc = src.split("=")[1];
        break;
      case "iframe":
        options.iframeSrc = src;
        break;
      case "audio":
        options.audio = src;
        break;
      case "vimeo":
        options.vimeoSrc = src.replace(/https\:\/\/vimeo\.com\//, "");
        break;
      default:
        options.imgSrc = src;
        break;
    }

    if (typeof onError === "function") {
      options.onError = onError;
    }

    if (typeof animationStart === "function") {
      options.animationStart = animationStart;
    }
    if (typeof animationEnd === "function") {
      options.animationEnd = animationEnd;
    }
    if (typeof onClose === "function") {
      options.onClose = onClose;
    }
    if (typeof onChangeImage === "function") {
      options.onChangeImage = onChangeImage;
    }
    if (noLoader) {
      options.noLoader = true;
    }

    BigPicture(options);
  };

  return (
    <div
      className={`bigpicture link picture ${className || ""}`}
      onClick={() => {
        if (onClick) onClick();
        zoomHandle();
      }}
      ref={elRef}
      title={caption || ""}
      style={{ display: "inline-block", ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};

BigPictureWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string,
  type: PropTypes.oneOf([
    "image",
    "video",
    "youtube",
    "vimeo",
    "iframe",
    "audio"
  ]).isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  animationStart: PropTypes.func,
  animationEnd: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  onChangeImage: PropTypes.func,
  noLoader: PropTypes.boolean
};

export default BigPictureWrapper;
