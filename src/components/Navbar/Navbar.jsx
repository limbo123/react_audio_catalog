import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { IoSettingsOutline } from 'react-icons/io5'

import routes from '../../routes'

import styles from './Navbar.module.css'

function Navbar({ language, setLang }) {
  const { t, i18n } = useTranslation()
  console.log(language)
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
              {t('Menu top')}
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
            <NavLink
              to={routes.search}
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              {t('Search')}
            </NavLink>
          </li>
        </ul>
        <div className={styles.ButtonSection}>
          <NavLink to={routes.addSong}>
            <Button size="sm" variant="warning" className={styles.CreateBtn}>
              {t('Create button')}
            </Button>
          </NavLink>
          <DropdownButton
            className={styles.SettingsBtn}
            id="dropdown-variants-primary"
            size="sm"
            title={<IoSettingsOutline size="1.4em" />}
            autoClose="outside"
          >
            <Dropdown.Item className={styles.ThemeChanger}>Theme</Dropdown.Item>
            <Dropdown.Item className={styles.LangChanger}>
              <button
                onClick={() => {
                  i18n.changeLanguage('ua')
                  setLang('ua')
                }}
                className={language === 'ua' ? styles.ActiveLanguageBtn : null}
              >
                UA
              </button>
              |
              <button
                onClick={() => {
                  i18n.changeLanguage('en')
                  setLang('en')
                }}
                className={language === 'en' ? styles.ActiveLanguageBtn : null}
              >
                EN
              </button>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
