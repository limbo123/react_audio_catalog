import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5"
import { withTranslation } from "react-i18next";

import styles from "./SearchForm.module.css";
import AudioList from "../../components/AudioList/AudioList";

class SearchForm extends Component {
  state = {
    searchQuery: "",
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    })
  }

  handleSubmit = event => {
    const { history, location } = this.props;

    event.preventDefault();

    history.push(`${location.pathname}?query=${this.state.searchQuery}`);
  }

  render() {
    return (
      <>
        <div className={styles.Container}>
          <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.SearchFormButton}><IoSearchOutline size="1.4em" /></button>

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

        {this.state.searchQuery && <AudioList name="searchAudios" />}
      </>
    );
  }
}

export default withTranslation()(withRouter(SearchForm));