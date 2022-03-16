import React, { Component } from "react";
import { IoSearchOutline } from "react-icons/io5"
import { withTranslation } from "react-i18next";


import styles from "./SearchForm.module.css";

class SearchForm extends Component {
  state = {
    searchQuery: "",
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    })
  }

  render() {
    return (
      <div className={styles.Container}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}><IoSearchOutline size="1.4em"/></button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoFocus="off"
            name="query"
            placeholder={this.props.t("Search")}
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default withTranslation()(SearchForm);