import { Component } from "react";
import { NavLink } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import "react-toggle/style.css"; // for ES6 modules
import Toggle from 'react-toggle';

import routes from "../../routes";

import styles from "./Navbar.module.css";

const body = document.querySelector("body");

class Navbar extends Component {
  state = {
    inputChecked: false,
  }

  componentDidMount() {
    if (localStorage.getItem("theme") === this.Theme.DARK) {
      body.classList.remove("light-body");
      body.classList.add("dark-body");

      this.setState({ inputChecked: true, });
    } else {
      body.classList.remove("dark-body");
      body.classList.add("light-body");
    }
  }

  Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };

  defaultTheme = this.Theme.LIGHT;

  getTheme = () => {
    let theme = localStorage.getItem("theme");

    if (!theme) {
      theme = this.defaultTheme;
      this.setTheme(theme);
    }

    return theme;
  }

  setTheme = (theme) => {
    localStorage.setItem("theme", theme);
  }

  theme = this.getTheme();

  changeTheme = () => {
    this.theme = this.theme === this.Theme.LIGHT ? this.Theme.DARK : this.Theme.LIGHT;

    if (this.theme === this.Theme.DARK) {
      this.setState({ inputChecked: true, });

      body.classList.remove("light-body");
      body.classList.add("dark-body");
    } else {
      this.setState({ inputChecked: false, });

      body.classList.remove("dark-body");
      body.classList.add("light-body");
    }

    this.setTheme(this.theme);
  }

  chageToolbar = () => {
    this.changeTheme();
  }

  render() {
    return (
      <nav className={styles.Navigation}>
        <div className={styles.Container}>
          <ul className={styles.NavList}>
            <li className={styles.NavListItem}>
              <NavLink
                to={routes.home}
                exact
                className={styles.NavLink}
                activeClassName={styles.ActiveNavlink}
              >
                {this.props.t("Menu top")}
              </NavLink>
            </li>
            <li className={styles.NavListItem}>
              <NavLink
                to={routes.search}
                className={styles.NavLink}
                activeClassName={styles.ActiveNavlink}
              >
                {this.props.t("Search")}
              </NavLink>
            </li>
          </ul>
          <div className={styles.ButtonSection}>
            <NavLink to={routes.addSong}>
              <Button size="sm" variant="warning" className={styles.CreateBtn}>
                {this.props.t("Create button")}
              </Button>
            </NavLink>
            <DropdownButton
              className={styles.SettingsBtn}
              id="dropdown-variants-primary"
              size="sm"
              title={<IoSettingsOutline size="1.4em" />}
              autoClose="outside"
            >
              <Dropdown.Item className={styles.ThemeChanger}>
                <div className="toolbar">
                  <div className="theme-switch">
                    <BsFillSunFill size="32px" className="theme-switch__icon" />

                    <div className="theme-switch__control" onClick={() => this.chageToolbar()}>
                      <input className="theme-switch__toggle" type="checkbox" name="theme" id="theme-switch-toggle" aria-label="Переключить между тёмной и светлой темой" readOnly checked={this.state.inputChecked} />
                      <label aria-hidden="true" className="theme-switch__track" htmlFor="theme-switch-toggle" />
                      <div aria-hidden="true" className="theme-switch__marker"></div>
                    </div>

                    <BsFillMoonFill size="32px" className="theme-switch__icon" />
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item className={styles.ThemeChanger}>
                <label>
                  <Toggle
                    onChange={()=>{console.log('ewij')}} />
                  <span>Custom className</span>
                </label>
              </Dropdown.Item>
              <Dropdown.Item className={styles.LangChanger}>
                <button
                  onClick={() => {
                    this.props.i18n.changeLanguage("ua");
                    this.props.setLang("ua");

                    localStorage.setItem("language", "ua");
                  }}
                  className={this.props.language === "ua" ? styles.ActiveLanguageBtn : null}
                >
                  UA
                </button>
                |
                <button
                  onClick={() => {
                    this.props.i18n.changeLanguage("en");
                    this.props.setLang("en");

                    localStorage.setItem("language", "en");
                  }}
                  className={this.props.language === "en" ? styles.ActiveLanguageBtn : null}
                >
                  EN
                </button>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </nav>
    );
  }
}

export default withTranslation()(Navbar);