import React from "react";
import styles from "./Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { withTranslation } from "react-i18next";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://app-audio.herokuapp.com/api/";

const INITIAL_STATE = {
  title: "",
  author: "",
  genres: "",
  uploadImg: undefined,
  uploadAudioName: "",
  currentTheme: "",
};

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE };

  audioInputRef = React.createRef();
  imageInputRef = React.createRef();

  componentDidMount() {
    if (localStorage.getItem("theme") === "dark-theme") {
      this.setState({ currentTheme: "darkNotify" });
    } else {
      this.setState({ currentTheme: "lightNotify" });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleUploadImg = (event) => {
    this.setState({
      uploadImg: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleUploadAudio = (event) => {
    console.log(event.target.files);

    this.setState({
      uploadAudioName: event.target.files[0].name,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (localStorage.getItem("theme") === "dark-theme") {
      this.setState({ currentTheme: "darkNotify" });
    } else {
      this.setState({ currentTheme: "lightNotify" });
    }

    const formData = new FormData(document.forms.createForm);

    toast.promise(
      axios
        .post(`/audios`, formData),
      {
        pending: `${this.props.t("Creating Song")}`,
        success: `${this.props.t("Song Created")}`,
        error: `${this.props.t("Cannot Create A Song")}`,
      }
    );

    // It`s for testing uploading song
    
    // toast.success('Test!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: true,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });

    this.reset();
  };

  reset = () => {
    this.setState({
      title: "",
      author: "",
      genres: "",
      uploadImg: null,
      uploadAudioName: "",
    });

    this.audioInputRef.current.value = null;
    this.imageInputRef.current.value = null;
  };

  render() {
    const { title, author, genres } = this.state;

    return (
      <>
        <ToastContainer
          toastClassName={this.state.currentTheme}
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <form
          className={styles.Container}
          onSubmit={this.handleSubmit}
          name="createForm"
          encType="multipart/form-data"
        >
          <h2>{this.props.t("Enter Song Information")}:</h2>

          <input
            type="file"
            accept="image/*"
            className="form-input visually-hidden"
            id="createImageInput"
            name="image"
            ref={this.imageInputRef}
            onChange={this.handleUploadImg}
            required
          />
          <label className={styles.CreateFormBtn2} htmlFor="createImageInput">
            <AiOutlineCloudUpload className={styles.CreateFormUploadImg} />

            {this.props.t("Upload File")}

            {this.state.uploadImg && (
              <img
                src={this.state.uploadImg}
                alt=""
                className={styles.uploadImage}
              />
            )}
          </label>

          <div className={styles.CreateForm}>
            <label>
              <input
                className={styles.CreateFormInput}
                type="text"
                autoFocus="off"
                placeholder={this.props.t("Song Name")}
                name="title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </label>
            <label>
              <input
                className={styles.CreateFormInput}
                type="text"
                autoFocus="off"
                placeholder={this.props.t("Song Author")}
                name="author"
                value={author}
                onChange={this.handleChange}
                required
              />
            </label>
            <label>
              <input
                className={styles.CreateFormInput}
                type="text"
                autoFocus="off"
                placeholder={this.props.t("Song Genres") + " (tag1, tag2)"}
                name="genres"
                value={genres}
                onChange={this.handleChange}
                required
              />
            </label>

            <div className={styles.uploadAudio}>
              <div>
                <label htmlFor="file-input">
                  <AiOutlineCloudUpload size="1.5rem" />
                </label>
                <label htmlFor="file-input">
                  <p className={styles.uploadAudioTip}>
                    {this.props.t("Upload Audio")}
                  </p>
                </label>
              </div>
              <label htmlFor="file-input">
                <p className={styles.uploadAudioName}>
                  {this.state.uploadAudioName}
                </p>
              </label>
              <input
                className={`${styles.CreateFormInput} ${styles.visuallyHidden}`}
                type="file"
                id="file-input"
                name="audio"
                accept="audio/*"
                ref={this.audioInputRef}
                onChange={this.handleUploadAudio}
                required
              />
            </div>

            <button type="submit" className={styles.CreateFormButton} >
              {this.props.t("Submit")}
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default withTranslation()(CreateForm);
