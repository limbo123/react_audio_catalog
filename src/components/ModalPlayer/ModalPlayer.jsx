import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { FiMinimize2 } from "react-icons/fi";
import formatTime from "../../formatTime";

import styles from "./ModalPlayer.module.css";

const modalRoot = document.querySelector("#modal-player");

const ModalPlayer = ({ handleModal, handleMini, isModMax, audios, trackIndex }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(trackIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const audioElement = useRef(null);
  

  const timeUpdate = () => {
    setTime(audioElement.current.currentTime);
  };

  useEffect(() => {
    setCurrentSongIndex(trackIndex);
    axios.patch(`/audios/${audios[currentSongIndex]._id}/listen`);
    console.log(audios[currentSongIndex]);
    setIsPlaying(true);
  }, [trackIndex])

  useEffect(() => {
    isPlaying ? audioElement.current.play() : audioElement.current.pause();
  });

  const skipSong = (forward = true) => {
    if (forward) {
      setCurrentSongIndex(() => {
        let nextIndex = currentSongIndex;
        nextIndex++;
        if (!audios[nextIndex]) {
          nextIndex = 0;
        }
        console.log(nextIndex);
        return nextIndex;
      });
    } else {
      setCurrentSongIndex(() => {
        let nextIndex = currentSongIndex;
        nextIndex--;
        if (!audios[nextIndex]) {
          nextIndex = audios.length - 1;
        }
        console.log(nextIndex);
        return nextIndex;
      });
    }
  };

  useEffect(() => {
    const audio = audioElement.current;
    audio.addEventListener("timeupdate", timeUpdate);
    audio.addEventListener("ended", skipSong);

    return () => {
      audio.removeEventListener("timeupdate", timeUpdate);
      audio.addEventListener("ended", skipSong);
    };
  });

  const timePercent = (time / audioElement?.current?.duration) * 100;
  const formattedDuration = formatTime(audioElement?.current?.duration);
  const formattedTime = formatTime(time);

  return createPortal(
    <div className={isModMax ? styles.Overlay : styles.Overlay_mini}>
      <h6 className={isModMax ? styles.ModalTitle : styles.ModalTitle_mini}>NOW PLAYING</h6>
      <div className={isModMax ? styles.CloseModalBtn : styles.CloseModalBtn_mini} onClick={handleMini}>
        <FiMinimize2 size="1.6rem" />
      </div>
      <div className={isModMax ? styles.SongDetails : styles.SongDetails_mini}>
        <img className={isModMax ? styles.SongImage : styles.SongImage_mini} src={audios[currentSongIndex].imageUrl} alt="" />
        <h6 className={isModMax ? styles.SongTitle : styles.SongTitle_mini}>{audios[currentSongIndex].title}</h6>
        <p className={isModMax ? styles.SongAuthor : styles.SongAuthor_mini}>{audios[currentSongIndex].author}</p>
      </div>

      <div className={isModMax ? styles.PlayerTimeline : styles.PlayerTimeline_mini}>
        <span className={isModMax ? styles.playerTimeCurrent : styles.playerTimeCurrent_mini}>{formattedTime}</span>
        <input
          type="range"
          className={isModMax ? styles.playerTimeControl : styles.playerTimeControl_mini}
          value={time}
          max={audioElement?.current?.duration || 0}
          onChange={(e) =>
            (audioElement.current.currentTime = e.currentTarget.value)
          }
          style={{
            background: `linear-gradient(to right, #fff ${timePercent}%, rgba(255, 255, 255, 0.3) ${timePercent}%)`,
          }}
        />
        <span className={styles.playerTimeDuration}>{formattedDuration}</span>
      </div>

      <div className={isModMax ? styles.PlayerControls : styles.PlayerControls_mini}>
        <audio
          src={audios[currentSongIndex].audioUrl}
          ref={audioElement}
        ></audio>
        <button className={isModMax ? styles.SkipBackBtn : styles.SkipBackBtn_mini} onClick={() => skipSong(false)}>
          <BsFillSkipStartFill color="#fff" size="1.3rem" />
        </button>
        <button
          className={isModMax ? styles.PlayBtn : styles.PlayBtn_mini}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <BsFillPauseFill color="#fff" size="2rem" />
          ) : (
            <BsPlayFill color="#fff" size="2rem" />
          )}
        </button>
        <button className={isModMax ? styles.SkipBackBtn : styles.SkipBackBtn_mini} onClick={() => skipSong()}>
          <BsFillSkipEndFill color="#fff" size="1.3rem" />
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPlayer;
