import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AddSongPage from "./pages/AddSongPage/AddSongPage";
import Navbar from "./components/Navbar/Navbar";
import ModalPlayer from "./components/ModalPlayer/ModalPlayer";
<<<<<<< HEAD

import routes from "./routes";
=======
import routes from "./routes";
import NavbarMobile from "./components/NavbarMobile/NavbarMobile";
>>>>>>> origin/zavodskiyKV

export default class App extends React.Component {    
  state = {
    currentLanguage: "",
    isModalOpened: false,
<<<<<<< HEAD
    isModalMaximized: true,
    playerTrackIndex: 0,
    audiosArray: [],
  };

=======
  };
>>>>>>> origin/zavodskiyKV

  componentDidMount() {
    this.setState({
      currentLanguage: localStorage.getItem("language"),
    });
  }

  handleMini = () => {
    if (this.state.isModalMaximized) {
      console.log(false);
      this.setState(() => ({
        isModalMaximized: false,
      }));
    } else {
      console.log(true);
      this.setState(() => ({
        isModalMaximized: true,
      }));
    }

    if (this.state.isModalOpened) {
    } else {
      console.log(true);
      this.setState(() => ({
        isModalMaximized: true,
      }));
    }

    setTimeout(() => {
      if (this.state.isModalMaximized) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    }, 50);
  };

  handleModal = (currentIndex, audiosArray) => {

    if (this.state.isModalOpened === false) {

      this.setState((prevState) => ({
        isModalOpened: true,
        playerTrackIndex: currentIndex,
        audiosArray,
      }));
    } else {
      this.setState((prevState) => ({
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
        <NavbarMobile />
        <Switch>
          <Route
            path={routes.home}
            exact
            render={(props) => (
              <HomePage {...props} handleModal={this.handleModal} />
<<<<<<< HEAD
            )}
          />
          <Route
            path={routes.search}
            component={(props) => (
              <SearchPage {...props} handleModal={this.handleModal} />
=======
>>>>>>> origin/zavodskiyKV
            )}
          />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    );
  }
}
