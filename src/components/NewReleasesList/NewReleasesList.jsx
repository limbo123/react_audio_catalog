import NewReleasesListTrack from "../NewReleasesListTrack/NewReleasesListTrack";
import axios from "axios";
import { Component } from "react";
import { PacmanLoader } from "react-spinners";

axios.defaults.baseURL = "https://app-audio.herokuapp.com/api/";

class AudioList extends Component {
  state = {
    audios: [],
    loading: true,
  }

  componentDidMount() {
    setTimeout(
      axios
        .get('audios/new')
        .then(response => this.setState({ audios: response.data, loading: false, }))
        .catch(error => console.error(error))
    , 500);
  }

  render() {
    return (
      <div className={this.props.name}>
        {this.state.loading && <div className="loader">
          <PacmanLoader color="#F8991C" loading={true} size={30} speedMultiplier="1.5" />
        </div>} 

        {this.state.audios.map(({ title, _id, author, imageUrl }) => {
          return (
            <>
              <NewReleasesListTrack
                key={_id}
                title={title}
                author={author}
                imageUrl={imageUrl}
                handleModal={this.props.handleModal}
              />
            </>
          );
        })}
      </div>
    );
  }
}

export default AudioList;
