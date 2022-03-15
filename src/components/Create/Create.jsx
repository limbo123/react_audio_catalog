import React from 'react'
import styles from './Create.module.css'
import ReactDOM from 'react-dom'

// const Create = (
//   <div>
//     <h2>Enter song information</h2>
//   </div>
// )

const INITIAL_STATE = {
  name: '',
  author: '',
  genres: '',
}

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({ [name]: value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const { name, author, genres } = this.state

    console.log(`
      Name: ${name}
      Author: ${author}
      Generes: ${genres}
    `)

    // this.props.onSubmit({ ...this.state })
    this.reset()
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    const { name, author, genres } = this.state

    return (
      <div className={styles.Container}>
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

          <button type="submit" className={styles.CreateFormButton}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// ReactDOM.render(Form, document.getElementById('root'))
export default CreateForm
