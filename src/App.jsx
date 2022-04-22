import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import AddSongPage from './pages/AddSongPage/AddSongPage'
import Navbar from './components/Navbar/Navbar'
import ModalPlayer from './components/ModalPlayer/ModalPlayer'
import routes from './routes'
import NavbarMobile from './components/NavbarMobile/NavbarMobile'

export default class App extends React.Component {
  state = {
    currentLanguage: '',
    isModalOpened: false,
    isModalMaximized: true,
    playerTrackIndex: 0,
    audiosArray: [],
  }

  componentDidMount() {
    this.setState({
      currentLanguage: localStorage.getItem('language'),
    })

    const currentIndex = JSON.parse(localStorage.getItem('current_index'))
    const isModalMaximized = JSON.parse(
      localStorage.getItem('isModalMaximized')
    )

    if (currentIndex !== null && currentIndex >= 0) {
      this.openModal(
        JSON.parse(localStorage.getItem('current_index')),
        JSON.parse(localStorage.getItem('audiosArray'))
      )
    }

    if (isModalMaximized !== null && isModalMaximized === false) {
      this.setState({
        isModalMaximized,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Save modal maximized state
    if (prevState.isModalMaximized !== this.state.isModalMaximized) {
      localStorage.setItem(
        'isModalMaximized',
        JSON.stringify(this.state.isModalMaximized)
      )
    }

    // Save audio data for modal
    if (prevState.isModalOpened !== this.state.isModalOpened) {
      localStorage.setItem(
        'current_index',
        JSON.stringify(this.state.playerTrackIndex)
      )
      localStorage.setItem(
        'audiosArray',
        JSON.stringify(this.state.audiosArray)
      )
    }

    // Update overflow
    if (
      prevState.isModalMaximized !== this.state.isModalMaximized ||
      prevState.isModalOpened !== this.state.isModalOpened
    ) {
      const overflowHidden =
        this.state.isModalMaximized && this.state.isModalOpened
      document.body.style.overflow = overflowHidden ? 'hidden' : 'auto'
    }
  }

  toggleMiniModal = () => {
    this.setState((prevState) => ({
      isModalMaximized: !prevState.isModalMaximized,
    }))
  }

  openModal = (currentIndex, audiosArray) => {
    this.setState({
      isModalOpened: true,
      playerTrackIndex: currentIndex,
      audiosArray,
    })
  }

  closeModal = () => {
    this.setState({
      isModalOpened: false,
      playerTrackIndex: -1,
      audiosArray: [],
    })
  }

  setLanguage = (lang) => {
    this.setState({
      currentLanguage: lang,
    })
  }

  render() {
    return (
      <>
        {this.state.isModalOpened && (
          <ModalPlayer
            trackIndex={this.state.playerTrackIndex}
            audios={this.state.audiosArray}
            toggleMini={this.toggleMiniModal}
            isModMax={this.state.isModalMaximized}
            onClose={this.closeModal}
          />
        )}

        {this.state.currentLanguage !== '' && (
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
              <HomePage {...props} handleModal={this.openModal} />
            )}
          />
          <Route
            path={routes.search}
            component={(props) => (
              <SearchPage {...props} handleModal={this.openModal} />
            )}
          />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    )
  }
}
