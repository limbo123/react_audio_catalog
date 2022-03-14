import React from 'react';
import styles from "./HomePage.module.css";
import { HiLightningBolt } from "react-icons/hi";

import AudioList from "../../components/AudioList/AudioList";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.titleCont}>
        <HiLightningBolt color="#F8991C" size="2rem" className={styles.lightning} />
        <h2 className={styles.homeTitle}>New releases:</h2>
      </div>

      <AudioList />
    </div>
  )
}

export default HomePage;