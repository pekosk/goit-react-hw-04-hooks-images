import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";
import React, { useState } from "react";

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submitQuery = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

    return (
      <header className={styles.searchbar}>
        <div className={styles.formContainer}>
          <form onSubmit={submitQuery} className={styles.form}>
            <button type="submit" className={styles.btn}>
              Search
            </button>

            <input
              className={styles.searchInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={value}
              onChange={handleChange}
              name="query"
            />
          </form>
        </div>
      </header>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
