import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5"
import { withTranslation } from "react-i18next";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

import styles from "./SearchForm.module.css";
import NewReleasesListTrack from "../NewReleasesListTrack/NewReleasesListTrack.jsx";

axios.defaults.baseURL = "https://app-audio.herokuapp.com/api/";

class SearchForm extends Component {
  state = {
    searchQuery: "",
    page: 1,
    audios: [],
    loading: false,
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

    this.setState({ loading: true, });

    axios
      .get(`audios?query=${this.state.searchQuery}&page=${this.state.page}&perPage=12`)
      .then(response => this.setState({ audios: response.data, loading: false, }))
      .catch(error => console.error(error));
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

        {this.state.loading && <div className="loader">
          <PacmanLoader color="#F8991C" loading={true} size={30} speedMultiplier="1.5" />
        </div>}

        {this.state.audios.length > 0 && this.state.searchQuery &&
          <>
            <h2 className={styles.searchTitle}>Results for query "<i>{this.state.searchQuery}</i>":</h2>

            <div className={styles.searchResults}>
              {this.state.audios.map(({ author, title, _id, imageUrl }) => {
                return (
                  <NewReleasesListTrack author={author} title={title} key={_id} imageUrl={imageUrl} />
                );
              })}
            </div>
          </>
        }
      </>
    );
  }
}

export default withTranslation()(withRouter(SearchForm));