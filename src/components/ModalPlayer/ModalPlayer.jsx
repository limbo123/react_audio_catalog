import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BsPlayFill,
  BsFillPauseFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5"
import formatTime from "../../formatTime";

import styles from "./ModalPlayer.module.css";

const modalRoot = document.querySelector("#modal-player");

const ModalPlayer = ({ onClose, toggleMini, isModMax, audios, trackIndex }) => {
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
        return nextIndex;
      });
    } else {
      setCurrentSongIndex(() => {
        let nextIndex = currentSongIndex;
        nextIndex--;
        if (!audios[nextIndex]) {
          nextIndex = audios.length - 1;
        }
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
  const maximizeModal = (e) => {
    console.log(e.target.tagName, e.currentTarget);
      if(!["svg", "BUTTON", "path", "polyline"].includes(e.target.tagName)) {
      const modalType = window.getComputedStyle(document.querySelector("#modal-overlay"), ":before").getPropertyValue("content").replace(/"/g, '');
      if(modalType === "mobile") {
        toggleMini()
      }
    }
  }

  return createPortal(
    <div id="modal-overlay" className={isModMax ? styles.Overlay : styles.Overlay_mini} onClick={maximizeModal}>
      <h6 className={isModMax ? styles.ModalTitle : styles.ModalTitle_mini}>NOW PLAYING:</h6>
      <div className={isModMax ? styles.miniModalBtn : styles.miniModalBtn_mini} onClick={toggleMini}>
        {isModMax ? <FiMinimize2 size="1.6rem" /> : <FiMaximize2 size="1.6rem" />}
      </div>
      <div className={isModMax ? styles.CloseModalBtn : styles.CloseModalBtn_mini} onClick={onClose}>
        <IoCloseSharp size="5rem" />
      </div>
      <div className={isModMax ? styles.SongDetails : styles.SongDetails_mini}>
        <img className={isModMax ? styles.SongImage : styles.SongImage_mini} src={audios[currentSongIndex].imageUrl} alt="" />
        <div>
          <h6 className={isModMax ? styles.SongTitle : styles.SongTitle_mini}>{audios[currentSongIndex].title.length > 37 ?
            audios[currentSongIndex].title = `${audios[currentSongIndex].title.substring(0, 35)}...` : audios[currentSongIndex].title
          }</h6>
          <p className={isModMax ? styles.SongAuthor : styles.SongAuthor_mini}>{audios[currentSongIndex].author}</p>
        </div>
      </div>
      <div className={isModMax ? styles.PlayerSettings : styles.PlayerSettings_mini}>
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
      </div>
    </div>,
    modalRoot
  );
};

export default ModalPlayer;
