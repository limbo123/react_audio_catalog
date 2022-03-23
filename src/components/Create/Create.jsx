import React from 'react';
import styles from './Create.module.css'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { withTranslation } from "react-i18next";
import axios from 'axios';

const INITIAL_STATE = {
  title: '',
  author: '',
  genres: '',
}

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value })
  };

  handleSubmit = evt => {
    evt.preventDefault()

    const formData = new FormData(document.forms.createForm);

    axios
      .post(`/audios`, formData)
      .then(data => console.log(data))
      .catch(error => console.error(error));

    this.reset()
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    const { title, author, genres } = this.state

    return (
      <form className={styles.Container} onSubmit={this.handleSubmit} name="createForm" encType='multipart/form-data'>
        <h2>{this.props.t("Enter Song Information")}:</h2>

        <input
          type="file"
          accept="image/*"
          className="form-input visually-hidden"
          id="createImageInput"
          name='image'
          required
        />
        <label className={styles.CreateFormBtn2} htmlFor="createImageInput">
          {this.props.t("Upload File")}
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

          <div>
            <label htmlFor="file-input">
              <AiOutlineCloudUpload size="1.5rem" />
            </label>
            <input
              className={`${styles.CreateFormInput} ${styles.visuallyHidden}`}
              type="file"
              id="file-input"
              name="audio"
              accept='audio/*'
              required
            />
          </div>

          <button type="submit" className={styles.CreateFormButton}>
            {this.props.t("Submit")}
          </button>
        </div>
      </form>
    )
  }
}

// ReactDOM.render(Create, document.getElementById('root'))
export default withTranslation()(CreateForm);
