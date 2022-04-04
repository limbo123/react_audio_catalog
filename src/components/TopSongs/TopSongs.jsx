import styles from "./TopSongs.module.css";
import { BsPlayFill } from "react-icons/bs";
import { Component } from "react";

class TopSongs extends Component {
    render() {
        return (
            <div className={styles.topSongs}>
                {this.props.audios.map(({ title, author, _id, imageUrl }, index, array) => {
                    // if (title.length > 17) {
                    //     title = `${title.substring(0, 15)}...`;
                    // }

                    // if (author.length > 23) {
                    //     author = `${author.substring(0, 20)}...`;
                    // }

                    return (
                        <div className={styles.topCard} key={_id}>
                            <img src={imageUrl} alt={title} />
                            <div className={styles.topDescription}>
                                <h3>{title}</h3>
                                <h4>{author}</h4>
                            </div>

                            {/* <h4 className={styles.topDuration}>3:56</h4> */}

                            <div className={styles.topHover}>
                                <button type="button" className={styles.topButton} onClick={() => this.props.handleModal(index, array)}>
                                    <BsPlayFill className={styles.topPlay} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default TopSongs;