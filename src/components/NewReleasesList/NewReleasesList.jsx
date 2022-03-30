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
    axios
      .get('audios/new')
      .then(response => this.setState({ audios: response.data, loading: false, }))
      .catch(error => console.error(error));
  }

  render() {
    return (
      <>
        {
          this.state.loading && <div className="loader">
            <PacmanLoader color="#F8991C" loading={true} size={30} speedMultiplier="1.5" />
          </div>
        }

        < div className={this.props.name} >
          {
            this.state.audios.map(({ title, _id, author, imageUrl }, index, array) => {
              return (
                <NewReleasesListTrack
                  key={_id}
                  title={title}
                  author={author}
                  imageUrl={imageUrl}
                  handleModal={this.props.handleModal}
                  trackIndex={index}
                  audiosArray={array}
                />
              );
            })
          }
        </div >
      </>
    );
  }
}

export default AudioList;
