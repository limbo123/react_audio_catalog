import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AddSongPage from "./pages/AddSongPage/AddSongPage";
import Navbar from "./components/Navbar/Navbar";
import ModalPlayer from "./components/ModalPlayer/ModalPlayer";
import routes from "./routes";
import NavbarMobile from "./components/NavbarMobile/NavbarMobile";

export default class App extends React.Component {
  state = {
    currentLanguage: "",
    isModalOpened: false,
    isModalMaximized: true,
    playerTrackIndex: 0,
    audiosArray: [],
  };

  componentDidMount() {
    this.setState({
      currentLanguage: localStorage.getItem("language"),
    });

    const currentIndex = JSON.parse(localStorage.getItem("current_index"));
    const isModalMaximized = JSON.parse(localStorage.getItem('isModalMaximized'));

    if (currentIndex !== null && currentIndex >= 0) {
      this.handleModal(
        JSON.parse(localStorage.getItem("current_index")),
        JSON.parse(localStorage.getItem("audiosArray"))
      );
    }

    if (isModalMaximized !== null && isModalMaximized === false) {
      this.setState({
        isModalMaximized: JSON.parse(localStorage.getItem('isModalMaximized')),
      });

      this.handleMini();
    }
  }

  handleMini = () => {
    if (this.state.isModalMaximized) {
      localStorage.setItem("isModalMaximized", JSON.stringify(false));
      this.setState(() => ({
        isModalMaximized: false,
      }), () => {
        if (this.state.isModalMaximized) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "visible";
        }
      });
    } else {
      localStorage.setItem("isModalMaximized", JSON.stringify(true));
      this.setState(() => ({
        isModalMaximized: true,
      }), () => {
        if (this.state.isModalMaximized) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "visible";
        }
      });
    }

    this.setState(() => ({
      isModalMaximized: true,
    }), () => {
      if (this.state.isModalMaximized) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    });
  };

  handleModal = (currentIndex, audiosArray) => {
    if (this.state.isModalOpened === false) {
      localStorage.setItem("current_index", JSON.stringify(currentIndex));
      localStorage.setItem("audiosArray", JSON.stringify(audiosArray));

      this.setState(() => ({
        isModalOpened: true,
        playerTrackIndex: currentIndex,
        audiosArray,
      }));
    } else {
      localStorage.setItem("current_index", '-1');
      this.setState(() => ({
        isModalOpened: false,
        playerTrackIndex: currentIndex,
        audiosArray,
      }));
    }
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
          <ModalPlayer
            trackIndex={this.state.playerTrackIndex}
            audios={this.state.audiosArray}
            handleMini={this.handleMini}
            isModMax={this.state.isModalMaximized}
            handleModal={this.handleModal}
          />
        )}

        {this.state.currentLanguage !== "" && (
          <Navbar
            language={this.state.currentLanguage}
            setLang={this.setLanguage}
          />
        )}
        <NavbarMobile
          language={this.state.currentLanguage}
          setLang={this.setLanguage}
        />
        <Switch>
          <Route
            path={routes.home}
            exact
            render={(props) => (
              <HomePage {...props} handleModal={this.handleModal} />
            )}
          />
          <Route
            path={routes.search}
            component={(props) => (
              <SearchPage {...props} handleModal={this.handleModal} />
            )}
          />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    );
  }
}
