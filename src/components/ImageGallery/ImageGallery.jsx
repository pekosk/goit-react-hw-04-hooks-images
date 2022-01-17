import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import { memo } from "react";

import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => (
  <ul className={styles.galleryList}>
    {images.map((image, idx) => {
      return (
        <ImageGalleryItem
          key={image.id + idx}
          image={image}
          onClick={onClick}
        />
      );
    })}
  </ul>
);

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
