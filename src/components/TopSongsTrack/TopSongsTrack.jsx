import { Component } from "react";
import { BsPlayFill } from "react-icons/bs";
import styles from "./TopSongsTrack.module.css";
import formatTime from "../../formatTime";
import { Skeleton } from "@mui/material";

export default class TopSongsTrack extends Component {
    state = {
        duration: 0,
        loading: true,
    }

    componentDidMount() {
        const audio = new Audio(this.props.audioUrl);

        audio.onloadedmetadata = () => {
            this.setState({ duration: formatTime(audio.duration), loading: false, });
        }
    }

    strCut = (strTrackName) => {
        if (strTrackName.length > 15) {
          const newName = strTrackName.slice(0, 15);
          return `${newName}...`;
        }else{return strTrackName}
      };

    render() {
        return (
            <div className={styles.topCard}>
                <img src={this.props.imageUrl} alt={this.props.title} />
                <div className={styles.topDescription}>
                    <h3>{this.strCut(this.props.title)}</h3>
                    <h4>{this.props.author}</h4>
                </div>

                <div className={styles.topHover}>
                    <button type="button" className={styles.topButton} onClick={() => this.props.handleModal(this.props.index, this.props.array)}>
                        <BsPlayFill className={styles.topPlay} />
                    </button>
                </div>

                {this.state.loading && <Skeleton variant="text" animation="wave" className={`${styles.topDuration} ${styles.loader}`} />}

                {this.state.duration !== 0 && <h4 className={styles.topDuration}>{this.state.duration}</h4>}
            </div>
        );
    }
}