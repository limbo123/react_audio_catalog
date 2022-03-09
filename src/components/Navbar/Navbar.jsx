import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";

import styles from "./Navbar.module.css";

function Navbar({ language, setLang }) {
  const { t, i18n } = useTranslation();
  console.log(language);
  return (
    <nav className={styles.Navigation}>
      <div className={styles.container}>
        <ul className={styles.NavList}>
          <li className={styles.NavListItem}>
            <NavLink
              to="/" // TEST ROUTE
              exact
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              {t("Menu top")}
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
            <NavLink
              to="/1" // TEST ROUTE
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              {t("Menu search")}
            </NavLink>
          </li>
        </ul>
        <div className={styles.ButtonSection}>
          <Button size="sm" variant="warning" className={styles.CreateBtn}>
            Create
          </Button>
          <DropdownButton
            className={styles.SettingsBtn}
            id="dropdown-variants-primary"
            size="sm"
            title="Settings"
            autoClose="outside"
          >
            <Dropdown.Item className={styles.ThemeChanger}>Theme</Dropdown.Item>
            <Dropdown.Item className={styles.LangChanger}>
              <button
                onClick={() => {
                  i18n.changeLanguage("ua");
                  setLang("ua");
                }}
                className={language === "ua" ? styles.ActiveLanguageBtn : null}
              >
                UA
              </button>
              |
              <button
                onClick={() => {
                  i18n.changeLanguage("en");
                  setLang("en");
                }}
                className={language === "en" ? styles.ActiveLanguageBtn : null}
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

export default Navbar;
