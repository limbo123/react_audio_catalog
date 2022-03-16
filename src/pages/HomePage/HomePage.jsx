import React from 'react';
import styles from "./HomePage.module.css";
import { HiLightningBolt } from "react-icons/hi";
import { BsSuitHeartFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import AudioList from "../../components/AudioList/AudioList";
import TopSongs from "../../components/TopSongs/TopSongs";

function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleCont}>
          <HiLightningBolt color="#F8991C" size="2rem" className={styles.lightning} />
          <h2 className={styles.homeTitle}>{t("New releases header")}:</h2>
        </div>

        <AudioList name="audios" />
      </div>

      <div className={styles.container}>
        <div className={styles.titleCont}>
          <BsSuitHeartFill color="#F8991C" size="2rem" className={styles.lightning} />
          <h2 className={styles.homeTitle}>{t("Top songs header")}:</h2>
        </div>

        <TopSongs />
      </div>
    </>
  )
}

export default HomePage;