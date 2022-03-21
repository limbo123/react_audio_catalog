import React from "react";
import styles from "./HomePage.module.css";
import { HiLightningBolt } from "react-icons/hi";
import { BsSuitHeartFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

import NewReleasesList from "../../components/NewReleasesList/NewReleasesList";
import TopSongs from "../../components/TopSongs/TopSongs";

function HomePage({ handleModal, isModalOpened }) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleCont}>
          <HiLightningBolt
            color="#F8991C"
            size="2rem"
            className={styles.lightning}
          />
          <h2 className={styles.homeTitle}>{t("New releases header")}:</h2>
        </div>

        <NewReleasesList
          name="audios"
          handleModal={handleModal}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.titleCont}>
          <BsSuitHeartFill
            color="#F8991C"
            size="2rem"
            className={styles.lightning}
          />
          <h2 className={styles.homeTitle}>{t("Top songs header")}:</h2>
        </div>

        <TopSongs />
      </div>
    </>
  );
}

export default HomePage;
