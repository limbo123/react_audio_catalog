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
  uploadImg: null,
  uploadAudioName: null,
};

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE };

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
    this.setState({
      uploadAudioName: event.target.files[0].name,
    });
  };

  notify = () => {
    toast("notification");
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.notify();
    const formData = new FormData(document.forms.createForm);

    axios
      .post(`/audios`, formData)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    //.finally(() => this.notify());

    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { title, author, genres } = this.state;

    return (
      <>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
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
                onChange={this.handleUploadAudio}
                required
              />
            </div>

            <button type="submit" className={styles.CreateFormButton}>
              {this.props.t("Submit")}
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default withTranslation()(CreateForm);
