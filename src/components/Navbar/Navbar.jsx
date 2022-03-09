import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
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
              Browse
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
            <NavLink
              to="/1" // TEST ROUTE
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              Search
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
            <NavLink
              to="/2" // TEST ROUTE
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              Library
            </NavLink>
          </li>
          <li className={styles.NavListItem}>
            <NavLink
              to="/3" // TEST ROUTE
              className={styles.NavLink}
              activeClassName={styles.ActiveNavlink}
            >
              Profile
            </NavLink>
          </li>
        </ul>
        <h3 className={styles.UserInfo}>John Doe</h3>
      </div>
    </nav>
  );
}

export default Navbar;
