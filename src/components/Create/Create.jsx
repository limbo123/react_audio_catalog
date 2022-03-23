import React from 'react'
import styles from './Create.module.css'
import { AiOutlineCloudUpload } from 'react-icons/ai';

const INITIAL_STATE = {
  name: '',
  author: '',
  genres: '',
  upload: '',
}

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({ [name]: value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const { name, author, genres, upload } = this.state

    console.log(`
      Name: ${name}
      Author: ${author}
      Generes: ${genres}
      Upload audio: ${upload}
    `)

    // this.props.onSubmit({ ...this.state })
    this.reset()
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    const { name, author, genres, upload } = this.state

    return (
      <div className={styles.Container}>
        <h2>Enter song information</h2>
        <div className={styles.CreateFormBtn2}>
          <input
            type="file"
            accept="image/*"
            class="form-input visually-hidden"
            id="createImageInput"
          />
          <label className="form-label" for="createImageInput">
            {/* <AiOutlineCloudUpload className={styles.UploadIcon} /> */}
            Upload a file
          </label>
        </div>
        {/* <button type="submit" className={styles.CreateFormButton2}>
          <AiOutlineCloudUpload className={styles.UploadIcon} />
          Upload Image
        </button> */}
        <form className={styles.CreateForm} onSubmit={this.handleSubmit}>
          <label>
            <input
              className={styles.CreateFormInput}
              type="text"
              autoFocus="off"
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className={styles.CreateFormInput}
              type="text"
              autoFocus="off"
              placeholder="Author"
              name="author"
              value={author}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              className={styles.CreateFormInput}
              type="text"
              autoFocus="off"
              placeholder="Genres"
              name="genres"
              value={genres}
              onChange={this.handleChange}
            />
          </label>

          <div>
            <label htmlFor="file-input">
              <AiOutlineCloudUpload />
            </label>
            <input
              className={`${styles.CreateFormInput} ${styles.visuallyHidden}`}
              type="file"
              id="file-input"
              name="file"
              multiple
            />
          </div>

          <button type="submit" className={styles.CreateFormButton}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// ReactDOM.render(Create, document.getElementById('root'))
export default CreateForm
