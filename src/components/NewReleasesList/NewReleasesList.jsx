import NewReleasesListTrack from "../NewReleasesListTrack/NewReleasesListTrack";
import axios from "axios";
import { Component } from "react";

axios.defaults.baseURL = "https://app-audio.herokuapp.com/api/";

class AudioList extends Component {
  state = {
    audios: [],
  }

  componentDidMount() {
    axios
      .get('audios/new')
      .then(response => this.setState({ audios: response.data }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className={this.props.name}>
        {this.state.audios.map(({ title, _id, author, imageUrl }) => {
          return (
            <NewReleasesListTrack
              key={_id}
              title={title}
              author={author}
              imageUrl={imageUrl}
              handleModal={this.props.handleModal}
            />
          );
        })}
      </div>
    );
  }
}

export default AudioList;
