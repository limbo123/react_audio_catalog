import React from 'react'
import styles from './Create.module.css'
import { AiOutlineUpload } from 'react-icons/ai'
import ReactDOM from 'react-dom'

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
        <button type="submit" className={styles.CreateFormButton2}>
          <AiOutlineUpload className={styles.UploadIcon} />
          Upload Image
        </button>
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
          <form method="post" encType="multipart/form-data">
            <div>
              <input
                className={styles.CreateFormInput}
                type="file"
                id="file"
                name="file"
                multiple
              />
              {/* <label className={styles.UploadIcon}>
                <AiOutlineUpload />
              </label> */}
            </div>
          </form>
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
