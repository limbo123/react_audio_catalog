import styles from "./NavbarMobile.module.css";
import React, { Component } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { withRouter } from "react-router-dom";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import { IoSettingsOutline } from "react-icons/io5";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Toggle from "react-toggle";
import { withTranslation } from "react-i18next";


const body = document.querySelector("body");


class NavbarMobile extends Component {
  state = {
    inputChecked: false,
  };

  componentDidMount() {
    if (localStorage.getItem("theme") === this.Theme.DARK) {
      body.classList.remove("light-body");
      body.classList.add("dark-body");

      this.setState({ inputChecked: true });
    } else {
      body.classList.remove("dark-body");
      body.classList.add("light-body");
    }
  }

  Theme = {
    LIGHT: "light-theme",
    DARK: "dark-theme",
  };

  defaultTheme = this.Theme.LIGHT;

  getTheme = () => {
    let theme = localStorage.getItem("theme");

    if (!theme) {
      theme = this.defaultTheme;
      this.setTheme(theme);
    }

    return theme;
  };

  setTheme = (theme) => {
    localStorage.setItem("theme", theme);
  };

  theme = this.getTheme();
  changeTheme = () => {
    this.theme =
      this.theme === this.Theme.LIGHT ? this.Theme.DARK : this.Theme.LIGHT;

    if (this.theme === this.Theme.DARK) {
      this.setState({ inputChecked: true });

      body.classList.remove("light-body");
      body.classList.add("dark-body");
    } else {
      this.setState({ inputChecked: false });

      body.classList.remove("dark-body");
      body.classList.add("light-body");
    }

    this.setTheme(this.theme);
  };

  chageToolbar = () => {
    this.changeTheme();
  };

  indicatorRef = React.createRef();
  tabbarRef = React.createRef();
  animate = (left, entry, active) => {
    gsap.to(active, {
      '--icon-circle': '0px',
      duration: 0.25,
      onComplete() {
        active.classList.remove(styles.active)
      },
    })

    gsap.to(this.indicatorRef.current.querySelector('path'), {
      keyframes: [
        {
          duration: 0.25,
          delay: 0.125,
          onStart() {
            gsap.to(entry, {
              keyframes: [
                {
                  '--icon-y': '4px',
                  '--icon-s': 0.9,
                  duration: 0.185,
                  delay: 0.025,
                },
                {
                  '--icon-circle': '28px',
                  '--icon-y': '0px',
                  '--icon-s': 1,
                  duration: 0.2,
                  clearProps: true,
                  onComplete() {
                    entry.classList.add(styles.active)
                  },
                },
              ],
            })
            gsap.to(this.tabbarRef.current, {
              keyframes: [
                {
                  '--indicator-circle-y': '-36px',
                  duration: 0.25,
                  delay: 0.05,
                },
                {
                  '--indicator-circle-o': 0,
                  duration: 0.1,
                  clearProps: true,
                  onComplete() {
                    gsap.set(this.tabbarRef.current, {
                      '--indicator-x': left,
                    })
                  },
                },
              ],
            })
          },
        },
      ],
    })

    gsap.to(this.tabbarRef.current, {
      keyframes: [
        {
          '--indicator-x': left,
          duration: 0.3,
        },
      ],
    })
  }
  onClick = (e) => {
    const entry = e.currentTarget.parentElement;
    this.props.history.push(`/${e.currentTarget.id}`)
    let active = this.tabbarRef.current.querySelector(`li.${styles.active}`);
    if (!active) {
      return
    }
    let left =
      entry.offsetLeft +
      entry.offsetWidth / 2 -
      this.indicatorRef.current.getBBox().width / 2 +
      'px'
    this.animate(left, entry, active)
  }
  render() {
    return (
      <div className={styles.navBar}>
        <div id={styles.tabbar} ref={this.tabbarRef}>
          <ul>
            <li className={this.props.location.pathname === routes.home ? styles.active : null}>
              <button id="home" onClick={this.onClick}>
                <svg>
                  <use xlinkHref="#iconHome" />
                </svg>
                <svg>
                  <use xlinkHref="#iconHomeFilled" />
                </svg>
              </button>
            </li>
            <li className={this.props.location.pathname === routes.search ? styles.active : null}>
              <button id="search" onClick={this.onClick}> 
                <svg>
                  <use xlinkHref="#iconFolder" />
                </svg>
                <svg>
                  <use xlinkHref="#iconFolderFilled" />
                </svg>
              </button>
            </li>
            <li className={this.props.location.pathname === routes.addSong ? styles.active : null}>
              <button id="add-song" onClick={this.onClick}>
                <svg>
                  <use xlinkHref="#iconUser" />
                </svg>
                <svg>
                  <use xlinkHref="#iconUserFilled" />
                </svg>
              </button>
            </li>
            <li className={styles.active}>
            <DropdownButton
              className={styles.SettingsBtn}
              id="dropdown-variants-primary"
              size="sm"
              title={<IoSettingsOutline size="1.4em" />}
              autoClose="outside"
              drop="up"
            >
              <Dropdown.Item className={styles.decide_item}>
                <label>
                  <Toggle
                    defaultChecked={false}
                    className="styled_toggle"
                    icons={{
                      checked: <BsFillMoonFill className={styles.toggle_icon} />,
                      unchecked: (
                        <BsFillSunFill className={styles.toggle_icon} />
                      ),
                    }}
                    checked={this.state.inputChecked}
                    onChange={() => this.chageToolbar()}
                  />
                </label>
              </Dropdown.Item>
              <Dropdown.Item className={styles.LangChanger}>
                <button
                  onClick={() => {
                    this.props.i18n.changeLanguage("ua");
                    this.props.setLang("ua");

                    localStorage.setItem("language", "ua");
                  }}
                  className={
                    this.props.language === "ua"
                      ? styles.ActiveLanguageBtn
                      : null
                  }
                >
                  <p>UA</p>
                </button>
                |
                <button
                  onClick={() => {
                    this.props.i18n.changeLanguage("en");
                    this.props.setLang("en");

                    localStorage.setItem("language", "en");
                  }}
                  className={
                    this.props.language === "en"
                      ? styles.ActiveLanguageBtn
                      : null
                  }
                >
                  <p>EN</p>
                </button>
              </Dropdown.Item>
            </DropdownButton>
            </li>
          </ul>
          <svg
            className={styles.indicator}
            ref={this.indicatorRef}
            viewBox="0 0 68 72"
          >
            <defs>
              <filter
                id="goo"
                x="-50%"
                width="200%"
                y="-50%"
                height="200%"
                colorInterpolationFilters="sRGB"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="1"
                  result="blur"
                ></feGaussianBlur>
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                  result="cm"
                ></feColorMatrix>
              </filter>
            </defs>
            <g filter="url(#goo)">
              <path d="M34 54C45.4078 54 48.3887 66.7534 68 72H0C19.6113 66.7534 22.5922 54 34 54Z" />
              <circle cx="34" cy="66" r="4" />
            </g>
          </svg>
        </div>

        <svg
          style={{
            display: 'none',
          }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <symbol
            id="iconHome"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.5358 2.91088C11.8081 2.69637 12.1919 2.69637 12.4642 2.91088L19.5708 8.51003C20.4733 9.2211 21 10.3067 21 11.4556V20.75C21 21.4404 20.4404 22 19.75 22H14.75C14.0596 22 13.5 21.4404 13.5 20.75V15.75C13.5 15.6119 13.3881 15.5 13.25 15.5H10.75C10.6119 15.5 10.5 15.6119 10.5 15.75V20.75C10.5 21.4404 9.94036 22 9.25 22H4.25C3.55964 22 3 21.4404 3 20.75V11.4556C3 10.3067 3.52672 9.2211 4.42923 8.51003L11.5358 2.91088ZM12 4.45482L5.35754 9.68827C4.81603 10.1149 4.5 10.7662 4.5 11.4556V20.5H9V15.75C9 14.7835 9.7835 14 10.75 14H13.25C14.2165 14 15 14.7835 15 15.75V20.5H19.5V11.4556C19.5 10.7662 19.184 10.1149 18.6425 9.68827L12 4.45482Z" />
          </symbol>
          <symbol
            id="iconHomeFilled"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.9992 11.8484L21 20.7181C21 21.1638 20.9536 21.3255 20.8664 21.4884C20.7793 21.6514 20.6514 21.7793 20.4884 21.8664C20.3255 21.9536 20.1638 22 19.7181 22H15.2819C14.8362 22 14.6745 21.9536 14.5116 21.8664C14.3486 21.7793 14.2207 21.6514 14.1336 21.4884C14.0464 21.3255 14 21.1638 14 20.7181V16.2819C14 15.8362 13.9536 15.6745 13.8664 15.5116C13.7793 15.3486 13.6514 15.2207 13.4884 15.1336C13.3255 15.0464 13.1638 15 12.7181 15H11.2819C10.8362 15 10.6745 15.0464 10.5116 15.1336C10.3486 15.2207 10.2207 15.3486 10.1336 15.5116C10.0464 15.6745 10 15.8362 10 16.2819V20.7181C10 21.1638 9.95359 21.3255 9.86643 21.4884C9.77928 21.6514 9.65139 21.7793 9.48842 21.8664C9.32546 21.9536 9.16382 22 8.71806 22H4.28194C3.83618 22 3.67454 21.9536 3.51158 21.8664C3.34861 21.7793 3.22072 21.6514 3.13357 21.4884C3.04641 21.3255 3 21.1638 3 20.7181V12.0465C3 11.2101 3.03626 10.9164 3.12103 10.5932C3.20581 10.2699 3.3391 9.98532 3.53316 9.71325L3.63288 9.58016C3.80691 9.36035 4.0367 9.13609 4.5722 8.68983L11.1575 3.20211C11.465 2.94583 11.5992 2.87958 11.7594 2.836C11.9195 2.79241 12.0805 2.79241 12.2406 2.836C12.4008 2.87958 12.535 2.94583 12.8425 3.20211L19.4278 8.68983C20.0704 9.22534 20.2728 9.44118 20.4668 9.71325C20.6609 9.98532 20.7942 10.2699 20.879 10.5932C20.9567 10.8895 20.9936 11.1609 20.9992 11.8484Z" />
          </symbol>
          <symbol
            id="iconChat"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.12006 20.1281 10.5322 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM8.75 13H13.2483C13.6625 13 13.9983 13.3358 13.9983 13.75C13.9983 14.1297 13.7161 14.4435 13.35 14.4932L13.2483 14.5H8.75C8.33579 14.5 8 14.1642 8 13.75C8 13.3703 8.28215 13.0565 8.64823 13.0068L8.75 13H13.2483H8.75ZM8.75 9.5H15.2545C15.6687 9.5 16.0045 9.83579 16.0045 10.25C16.0045 10.6297 15.7223 10.9435 15.3563 10.9932L15.2545 11H8.75C8.33579 11 8 10.6642 8 10.25C8 9.8703 8.28215 9.55651 8.64823 9.50685L8.75 9.5H15.2545H8.75Z" />
          </symbol>
          <symbol
            id="iconChatFilled"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3596 22 8.77516 21.6039 7.35578 20.8583L3.06538 21.9753C2.6111 22.0937 2.1469 21.8213 2.02858 21.367C1.99199 21.2266 1.99198 21.0791 2.02855 20.9386L3.1449 16.6502C2.3972 15.2294 2 13.6428 2 12C2 6.47715 6.47715 2 12 2ZM13.2517 13H8.75L8.64823 13.0068C8.28215 13.0565 8 13.3703 8 13.75C8 14.1297 8.28215 14.4435 8.64823 14.4932L8.75 14.5H13.2517L13.3535 14.4932C13.7196 14.4435 14.0017 14.1297 14.0017 13.75C14.0017 13.3703 13.7196 13.0565 13.3535 13.0068L13.2517 13ZM15.25 9.5H8.75L8.64823 9.50685C8.28215 9.55651 8 9.8703 8 10.25C8 10.6297 8.28215 10.9435 8.64823 10.9932L8.75 11H15.25L15.3518 10.9932C15.7178 10.9435 16 10.6297 16 10.25C16 9.8703 15.7178 9.55651 15.3518 9.50685L15.25 9.5Z" />
          </symbol>
          <symbol
            id="iconFolder"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.20693 4C8.66749 4 9.1153 4.14129 9.49094 4.40235L9.64734 4.5215L12.022 6.5H19.75C20.8867 6.5 21.8266 7.34297 21.9785 8.43788L21.9948 8.59595L22 8.75V17.75C22 18.9409 21.0748 19.9156 19.904 19.9948L19.75 20H4.25C3.05914 20 2.08436 19.0748 2.00519 17.904L2 17.75V6.25C2 5.05914 2.92516 4.08436 4.09595 4.00519L4.25 4H8.20693ZM9.64734 9.9785C9.29353 10.2733 8.85906 10.4515 8.40335 10.4914L8.20693 10.5L3.5 10.499V17.75C3.5 18.1297 3.78215 18.4435 4.14823 18.4932L4.25 18.5H19.75C20.1297 18.5 20.4435 18.2178 20.4932 17.8518L20.5 17.75V8.75C20.5 8.3703 20.2178 8.05651 19.8518 8.00685L19.75 8H12.021L9.64734 9.9785ZM8.20693 5.5H4.25C3.8703 5.5 3.55651 5.78215 3.50685 6.14823L3.5 6.25V8.999L8.20693 9C8.34729 9 8.4841 8.96063 8.60221 8.88738L8.68706 8.82617L10.578 7.249L8.68706 5.67383C8.57923 5.58398 8.44893 5.52664 8.31129 5.5073L8.20693 5.5Z" />
          </symbol>
          <symbol
            id="iconFolderFilled"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.821 6.5H19.75C20.8867 6.5 21.8266 7.34297 21.9785 8.43788L21.9948 8.59595L22 8.75V17.75C22 18.9409 21.0748 19.9156 19.904 19.9948L19.75 20H4.25C3.05914 20 2.08436 19.0748 2.00519 17.904L2 17.75V10.499L8.20693 10.5L8.40335 10.4914C8.79396 10.4572 9.16896 10.3214 9.49094 10.0977L9.64734 9.9785L13.821 6.5ZM8.20693 4C8.66749 4 9.1153 4.14129 9.49094 4.40235L9.64734 4.5215L11.75 6.273L8.68706 8.82617L8.60221 8.88738C8.51363 8.94232 8.41452 8.9782 8.31129 8.9927L8.20693 9L2 8.999V6.25C2 5.05914 2.92516 4.08436 4.09595 4.00519L4.25 4H8.20693Z" />
          </symbol>
          <symbol
            id="iconUser"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.7545 13.9999C18.9966 13.9999 20.0034 15.0068 20.0034 16.2488V16.8242C20.0034 17.7185 19.6838 18.5833 19.1023 19.2627C17.5329 21.0962 15.1457 22.0011 12.0004 22.0011C8.8545 22.0011 6.46849 21.0959 4.90219 19.2617C4.32242 18.5827 4.00391 17.7193 4.00391 16.8265V16.2488C4.00391 15.0068 5.01076 13.9999 6.25278 13.9999H17.7545ZM17.7545 15.4999H6.25278C5.83919 15.4999 5.50391 15.8352 5.50391 16.2488V16.8265C5.50391 17.3621 5.69502 17.8802 6.04287 18.2876C7.29618 19.7553 9.26206 20.5011 12.0004 20.5011C14.7387 20.5011 16.7063 19.7552 17.9627 18.2873C18.3117 17.8797 18.5034 17.3608 18.5034 16.8242V16.2488C18.5034 15.8352 18.1681 15.4999 17.7545 15.4999ZM12.0004 2.00462C14.7618 2.00462 17.0004 4.2432 17.0004 7.00462C17.0004 9.76605 14.7618 12.0046 12.0004 12.0046C9.23894 12.0046 7.00036 9.76605 7.00036 7.00462C7.00036 4.2432 9.23894 2.00462 12.0004 2.00462ZM12.0004 3.50462C10.0674 3.50462 8.50036 5.07163 8.50036 7.00462C8.50036 8.93762 10.0674 10.5046 12.0004 10.5046C13.9334 10.5046 15.5004 8.93762 15.5004 7.00462C15.5004 5.07163 13.9334 3.50462 12.0004 3.50462Z" />
          </symbol>
          <symbol
            id="iconUserFilled"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.7545 13.9999C18.9966 13.9999 20.0034 15.0068 20.0034 16.2488V17.1673C20.0034 17.7406 19.8242 18.2996 19.4908 18.7661C17.9449 20.9294 15.4206 22.0011 12.0004 22.0011C8.5794 22.0011 6.05643 20.9289 4.51427 18.7646C4.18231 18.2987 4.00391 17.7408 4.00391 17.1688V16.2488C4.00391 15.0068 5.01076 13.9999 6.25278 13.9999H17.7545ZM12.0004 2.00462C14.7618 2.00462 17.0004 4.2432 17.0004 7.00462C17.0004 9.76605 14.7618 12.0046 12.0004 12.0046C9.23894 12.0046 7.00036 9.76605 7.00036 7.00462C7.00036 4.2432 9.23894 2.00462 12.0004 2.00462Z" />
          </symbol>
        </svg>
      </div>
    )
  }
};

export default withTranslation()(withRouter(NavbarMobile));
