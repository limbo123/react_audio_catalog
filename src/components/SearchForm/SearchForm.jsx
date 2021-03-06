import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
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
    prompts: [],
  };

  handleChange = (event) => {
    if (!event.target.value) {
      this.setState({ audios: [], searchQuery: event.target.value });
    } else {
      this.setState({
        searchQuery: event.target.value,
      });
    }

    this.handlePrompt(event);
  };

  handlePrompt = (event) => {
    const { history, location } = this.props;

    event.preventDefault();

    if (!this.state.searchQuery) {
      this.setState({ audios: [] });
    } else {
      history.push(`${location.pathname}?query=${this.state.searchQuery}`);

      this.setState({ loading: true });

      axios
        .get(
          `audios?query=${this.state.searchQuery}&page=${this.state.page}&perPage=12`
        )
        .then((response) => {
          const titles = [];
          response.data.map((item) => {
            return titles.push(item.title);
          });
          this.setState({ prompts: titles, loading: false });
        })
        .catch((error) => console.error(error));
    }

    console.log(this.state.prompts);
  };

  proptChange = (event,s_item) => {
    this.setState({ searchQuery: s_item, loading: false });
    this.setState({ prompts: [], loading: false });
    this.handleSubmit(event)
  };

  handleSubmit = (event) => {
    const { history, location } = this.props;

    event.preventDefault();

    if (!this.state.searchQuery) {
      this.setState({ audios: [] });
    } else {
      history.push(`${location.pathname}?query=${this.state.searchQuery}`);

      this.setState({ loading: true });

      axios
        .get(
          `audios?query=${this.state.searchQuery}&page=${this.state.page}&perPage=12`
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ audios: response.data, loading: false });
        })
        .catch((error) => console.error(error));
    }
  };

  render() {
    return (
      <>
        <div className={styles.Container}>
          <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={styles.SearchFormButton}>
              <IoSearchOutline size="1.4em" />
            </button>
            <input
              className={styles.SearchFormInput}
              type="text"
              autoFocus="off"
              autoComplete="off"
              name="query"
              placeholder={this.props.t("Search")}
              value={this.state.searchQuery}
              onChange={this.handleChange}
            />
          </form>
          <ul className={styles.promtList} >{this.state.prompts.map((title) => {return(<li className={styles.promptItem} onClick={(event)=>{this.proptChange(event, title)}} key={this.state.prompts.indexOf(title)}>{title}</li>)})}</ul>
        </div>

        {this.state.loading && (
          <div className="loader">
            <PacmanLoader
              color="#F8991C"
              loading={true}
              size={30}
              speedMultiplier="1.5"
            />
          </div>
        )}

        {this.state.audios.length > 0 && this.state.searchQuery && (
          <>
            <h2 className={styles.searchTitle}>
              {this.props.t("Search Results")} "<i>{this.state.searchQuery}</i>
              ":
            </h2>

            <div className={styles.searchResults}>
              {this.state.audios.map(
                ({ author, title, _id, imageUrl }, index, array) => {
                  if (title.length > 17) {
                    title = `${title.substring(0, 15)}...`;
                  }

                  if (author.length > 23) {
                    author = `${author.substring(0, 20)}...`;
                  }

                  return (
                    <NewReleasesListTrack
                      author={author}
                      title={title}
                      key={_id}
                      imageUrl={imageUrl}
                      handleModal={this.props.handleModal}
                      trackIndex={index}
                      audiosArray={array}
                    />
                  );
                }
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default withTranslation()(withRouter(SearchForm));
