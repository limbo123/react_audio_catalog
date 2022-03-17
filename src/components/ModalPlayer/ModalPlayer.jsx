import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SongImg from "../../static/images/SongImg.png";
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import audios from "../../audios.json";
import formatTime from "../../formatTime"

import styles from "./ModalPlayer.module.css";

const modalRoot = document.querySelector("#modal-player");

const ModalPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const audioElement = useRef(null);

  const timeUpdate = () => {
    setTime(audioElement.current.currentTime)
  }

  useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
  });

  const skipSong = (forward = true) => {
    if (forward) {
      setCurrentSongIndex(() => {
        let newIndex = currentSongIndex;
        newIndex++;
        if (currentSongIndex > audios.length - 1) {
          newIndex = 0;
        }

        return newIndex;
      });
    } else {
      setCurrentSongIndex(() => {
        let newIndex = currentSongIndex;
        newIndex--;
        if (currentSongIndex < 0) {
          newIndex = audios.length - 1;
        }

        return newIndex;
      });
    }
  };

  useEffect(() => {
    const audio = audioElement.current; 
    audio.addEventListener('timeupdate', timeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate);
    };
  });

  const timePercent = (time / audioElement.current.duration) * 100;
  const formattedDuration = formatTime(audioElement.current.duration);
  const formattedTime = formatTime(time);

  return createPortal(
    <div className={styles.Overlay}>

      <h6 className={styles.ModalTitle}>Now playing</h6>
      <div className={styles.CloseModalBtn}>
        <GrClose size="1.6rem" />
      </div>
      <div className={styles.SongDetails}>
        <img className={styles.SongImage} src={SongImg} alt="" />
        <h6 className={styles.SongTitle}>{audios[currentSongIndex].title}</h6>
        <p className={styles.SongAuthor}>{audios[currentSongIndex].author}</p>
      </div>

      <div className={styles.PlayerTimeline}>
          <span className={styles.playerTimeCurrent}>{formattedTime}</span>
          <input
            type="range"
            className={styles.playerTimeControl}
            value={time}
            max={audioElement.current.duration || 0}
            onChange={(e) => audioElement.current.currentTime = e.currentTarget.value}
            style={{
              background: `linear-gradient(to right, #fff ${timePercent}%, rgba(255, 255, 255, 0.3) ${timePercent}%)`,
            }}
          />
          <span className={styles.playerTimeDuration}>{formattedDuration}</span>
        </div>

      <div className={styles.PlayerControls}>
      <audio src={audios[currentSongIndex].fileUrl} ref={audioElement}></audio>
        <button className={styles.SkipBackBtn} onClick={() => skipSong(false)}>
          <BsFillSkipStartFill color="#fff" size="1.3rem" />
        </button>
        <button
          className={styles.PlayBtn}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <BsFillPauseFill color="#fff" size="2rem" />
          ) : (
            <BsPlayFill color="#fff" size="2rem" />
          )}
        </button>
        <button className={styles.SkipBackBtn} onClick={() => skipSong()}>
          <BsFillSkipEndFill color="#fff" size="1.3rem" />
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPlayer;
