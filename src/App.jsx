import React from "react";
import { getI18n } from "react-i18next";
import { Route, Switch } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";

export default class App extends React.Component {
  state = {
    currentLanguage: "",
  };

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
      {this.state.currentLanguage !== "" && (
        <Navbar language={this.state.currentLanguage} setLang={this.setLanguage}/>
      )}
        <Switch>{/* ...Routes */}</Switch>
      </>
    );
  }
}
