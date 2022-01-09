import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";
import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitQuery = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const { submitQuery, handleChange } = this;
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
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
