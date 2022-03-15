import React from 'react'
import { getI18n } from 'react-i18next'
import { Route, Switch, Redirect } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import SearchPage from './pages/SearchPage/SearchPage'
import AddSongPage from './pages/AddSongPage/AddSongPage'
import Navbar from './components/Navbar/Navbar'
import Create from './components/Create/Create'

import routes from './routes'

export default class App extends React.Component {
  state = {
    currentLanguage: '',
  }

  componentDidMount() {
    this.setState({
      currentLanguage: getI18n().language,
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
        {this.state.currentLanguage !== '' && (
          <Navbar
            language={this.state.currentLanguage}
            setLang={this.setLanguage}
          />
        )}
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.search} component={SearchPage} />
          <Route path={routes.addSong} component={AddSongPage} />
          <Redirect to={routes.home} />
        </Switch>
      </>
    )
  }
}
