import React from "react";
import styles from "./NewReleasesListTrack.module.css"
import AudioImage from "../../static/AudioImage.png";
import { useTranslation } from "react-i18next";
import { AiFillPlayCircle } from "react-icons/ai";



function NewReleasesListTrack({ handleModal }) {
    const { t } = useTranslation();

  return (
    <div className={styles.audioCard}>
      <img src={AudioImage} alt="Audio Card" />
      <h3>Runnin</h3>
      <h4>Pharell Williams</h4>
      <div className={styles.audioHover}>
        <h5>
          {t("Release year")}: <br /> <b>2022</b>
        </h5>
        <button type="button" onClick={handleModal}>
          <AiFillPlayCircle size="3rem" className={styles.play} />
        </button>
        <p>{t("Play text")}</p>
      </div>
    </div>
  );
}

export default NewReleasesListTrack;
