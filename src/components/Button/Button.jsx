import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ title, onLoadMore }) => {
  return (
    <div className={styles.loadBtn}>
      <button type="button" onClick={onLoadMore} className={styles.btn}>
        {title}
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
