import styles from "./AudioList.module.css";
import AudioImage from "../../static/AudioImage.png";
import { AiFillPlayCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function AudioList({ name }) {
    const { t } = useTranslation();

    return (
        <div className={name}>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
            <div className={styles.audioCard}>
                <img src={AudioImage} alt="Audio Card" />
                <h3>Runnin</h3>
                <h4>Pharell Williams</h4>
                <div className={styles.audioHover}>
                    <button type="button"><AiFillPlayCircle size="3rem" className={styles.play} /></button>
                    <p>{t("Play text")}</p>
                </div>
            </div>
        </div>
    );
}

export default AudioList;