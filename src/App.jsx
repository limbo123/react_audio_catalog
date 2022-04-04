import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AddSongPage from "./pages/AddSongPage/AddSongPage";
import Navbar from "./components/Navbar/Navbar";
import ModalPlayer from "./components/ModalPlayer/ModalPlayer";

import routes from "./routes";

export default class App extends React.Component {
  state = {
    currentLanguage: "",
    isModalOpened: false,
    playerTrackIndex: 0,
    audiosArray: [],
  };

  componentDidMount() {
    this.setState({
      currentLanguage: localStorage.getItem("language"),
    });
  }

  handleModal = (currentIndex, audiosArray) => {
    if (this.state.isModalOpened) {
      this.setState((prevState) => ({
        isModalOpened: false,
      }));
    } else {
      this.setState((prevState) => ({
        isModalOpened: true,
        playerTrackIndex: currentIndex,
        audiosArray
      }));
    }

    setTimeout(() => {
      if (this.state.isModalOpened) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    }, 50);
  };

  setLanguage = (lang) => {
    this.setState({
      currentLanguage: lang,
    });
  };

  render() {
    return (
      <>
        {this.state.isModalOpened && (
          <ModalPlayer trackIndex={this.state.playerTrackIndex} audios={this.state.audiosArray} handleModal={this.handleModal} />
        )}

        {this.state.currentLanguage !== "" && (
          <Navbar
            language={this.state.currentLanguage}
            setLang={this.setLanguage}
          />
        )}
        <Switch>
          <Route
            path={routes.home}
            exact
            render={(props) => (
              <HomePage {...props} handleModal={this.handleModal} />
            )}
          />
          <Route path={routes.search} render={(props) => (
              <SearchPage {...props} handleModal={this.handleModal} />
            )} />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    );
  }
}
