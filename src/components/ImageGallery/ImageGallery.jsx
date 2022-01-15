import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import {memo} from "react";

import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => {
  const elem = images.map((item) => (
    <ImageGalleryItem
      onClick={() => onClick(item.id)}
      key={item.id}
      {...item}
    />
  ));
  return <ul className={styles.galleryList}>{elem}</ul>;
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default memo(ImageGallery);
