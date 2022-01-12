import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";
import React, { useState } from "react";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const submitQuery = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
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
              value={query}
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
