import styles from "./TopSongs.module.css";
import TopSongsTrack from "../TopSongsTrack/TopSongsTrack";
import { Component } from "react";

class TopSongs extends Component {
    render() {
        return (
            <div className={styles.topSongs}>
                {this.props.audios.map(({ title, author, _id, imageUrl, audioUrl }, index, array) => {
                    // if (title.length > 17) {
                    //     title = `${title.substring(0, 15)}...`;
                    // }

                    // if (author.length > 23) {
                    //     author = `${author.substring(0, 20)}...`;
                    // }

                    return (
                        <TopSongsTrack key={_id} title={title} author={author} imageUrl={imageUrl} index={index} array={array} audioUrl={audioUrl} />
                    );
                })}
            </div>
        );
    }
}

export default TopSongs;