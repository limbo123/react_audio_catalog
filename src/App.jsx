import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import AddSongPage from './pages/AddSongPage/AddSongPage'
import Navbar from './components/Navbar/Navbar'
import ModalPlayer from './components/ModalPlayer/ModalPlayer'

import routes from './routes'

export default class App extends React.Component {
  state = {
    currentLanguage: '',
    isModalOpened: false,
  }

  componentDidMount() {
    this.setState({
      currentLanguage: localStorage.getItem('language'),
    })
  }

  handleModal = () => {
    this.setState((prevState) => ({
      isModalOpened: !prevState.isModalOpened,
    }))
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
          <ModalPlayer handleModal={this.handleModal} />
        )}

        {this.state.currentLanguage !== '' && (
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
              <HomePage
                {...props}
                isModalOpened={this.state.isModalOpened}
                handleModal={this.handleModal}
              />
            )}
          />
          <Route path={routes.search} component={SearchPage} />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    )
  }
}
