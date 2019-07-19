import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

import BigPicture from "bigpicture";

const BigPictureGallery = ({
  children,
  loop = false,
  onError,
  animationStart,
  animationEnd,
  onClose,
  onChangeImage,
  noLoader
}) => {
  if (!children) return null;

  const zoomHandle = el => {
    let options = {};

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

    if (el) {
      BigPicture({
        el,
        gallery: el && el.parentNode && el.parentNode.children,
        loop,
        ...options
      });
      return;
    }
  };

  return (
    <React.Fragment>
      {React.Children.map(children, child => {
        let _childRef;
        return React.cloneElement(child, {
          ...child.props,
          ref: node => {
            _childRef = node;
            const { ref } = child;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          },
          onClick: e => {
            zoomHandle(_childRef);
            if (typeof child.props.onClick === "function") {
              child.props.onClick(e);
            }
          },
          "data-bp": child.props.zoomedSrc
            ? child.props.zoomedSrc
            : child.props.src,
          "data-caption": child.props.caption ? child.props.caption : ""
        });
      })}
    </React.Fragment>
  );
};

BigPictureGallery.propTypes = {
  children: PropTypes.node.isRequired,
  animationStart: PropTypes.func,
  animationEnd: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  onChangeImage: PropTypes.func,
  noLoader: PropTypes.boolean
};

export default BigPictureGallery;
