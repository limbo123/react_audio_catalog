import React from "react";
import styles from "./NewReleasesListTrack.module.css"
import AudioImage from "../../static/AudioImage.png";
import { useTranslation } from "react-i18next";
import { CgPlayButtonO } from "react-icons/cg";



function NewReleasesListTrack({ handleModal }) {
  const { t } = useTranslation();

  return (
    <div className={styles.audioCard}>
      <img src={AudioImage} alt="Audio Card" />
      <h3>Runnin</h3>
      <h4>Pharell Williams</h4>
        <button type="button" className={styles.button_play} onClick={handleModal}>
          <CgPlayButtonO size="3rem" className={styles.play} />
        </button>
    </div>
  );
}

export default NewReleasesListTrack;