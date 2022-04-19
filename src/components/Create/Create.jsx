import React from 'react'
import styles from './Create.module.css'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Multiselect } from 'multiselect-react-dropdown'

axios.defaults.baseURL = 'https://app-audio.herokuapp.com/api/'

const INITIAL_STATE = {
  title: '',
  author: '',
  genres: '',
  uploadImg: undefined,
  uploadAudioName: '',
  currentTheme: '',
}

class CreateForm extends React.Component {
  state = { ...INITIAL_STATE }

  audioInputRef = React.createRef()
  imageInputRef = React.createRef()

  componentDidMount() {
    if (localStorage.getItem('theme') === 'dark-theme') {
      this.setState({ currentTheme: 'darkNotify' })
    } else {
      this.setState({ currentTheme: 'lightNotify' })
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target

    this.setState({ [name]: value })
  }

  handleUploadImg = (event) => {
    this.setState({
      uploadImg: URL.createObjectURL(event.target.files[0]),
    })
  }

  handleUploadAudio = (event) => {
    this.setState({
      uploadAudioName: event.target.files[0].name,
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    if (localStorage.getItem('theme') === 'dark-theme') {
      this.setState({ currentTheme: 'darkNotify' })
    } else {
      this.setState({ currentTheme: 'lightNotify' })
    }

    const formData = new FormData(document.forms.createForm)
    formData.append('genres', this.state.genres)
    toast.promise(axios.post(`/audios`, formData), {
      pending: `${this.props.t('Creating Song')}`,
      success: `${this.props.t('Song Created')}`,
      error: `${this.props.t('Cannot Create A Song')}`,
    })

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

    this.reset()
  }

  handleSelect = (event) => {
    const genreArray = []

    event.map((genre) => {
      const genreValues = Object.values(genre)
      const genreKey = genreValues[0]

      return genreArray.push(genreKey)
    })

    this.setState({ genres: genreArray.join(', ') })
  }

  reset = () => {
    this.setState({
      title: '',
      author: '',
      genres: '',
      uploadImg: null,
      uploadAudioName: '',
    })

    this.audioInputRef.current.value = null
    this.imageInputRef.current.value = null
  }

  render() {
    const { title, author } = this.state

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
          <h2>{this.props.t('Enter Song Information')}:</h2>

          <div className={styles.CreateForm}>
            <label>
              <input
                className={styles.CreateFormInput}
                type="text"
                autoFocus="off"
                placeholder={this.props.t('Song Name')}
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
                placeholder={this.props.t('Song Author')}
                name="author"
                value={author}
                onChange={this.handleChange}
                required
              />
            </label>
            <label>
              <Multiselect
                displayValue="key"
                id="css_custom_multiselect"
                showArrow="true"
                closeIcon="circle"
                onKeyPressFn={function noRefCheck() {}}
                onRemove={this.handleSelect}
                onSearch={function noRefCheck() {}}
                onSelect={this.handleSelect}
                options={[
                  {
                    cat: 'pop',
                    key: `${this.props.t('Pop')}`,
                  },
                  {
                    cat: 'rock',
                    key: `${this.props.t('Rock')}`,
                  },
                  {
                    cat: 'jazz',
                    key: `${this.props.t('Jazz')}`,
                  },
                  {
                    cat: 'traditional',
                    key: `${this.props.t('Traditional')}`,
                  },
                  {
                    cat: 'hip-hop',
                    key: `${this.props.t('Hip-hop')}`,
                  },
                  {
                    cat: 'electronic',
                    key: `${this.props.t('Electronic')}`,
                  },
                  {
                    cat: 'folk',
                    key: `${this.props.t('Folk')}`,
                  },
                  {
                    cat: 'indi',
                    key: `${this.props.t('Indi')}`,
                  },
                  {
                    cat: 'country',
                    key: `${this.props.t('Country')}`,
                  },
                  {
                    cat: 'classical',
                    key: `${this.props.t('Classical')}`,
                  },
                ]}
                placeholder={`${this.props.t('Click To Select Genres')}`}
                style={{
                  chips: {
                    background: 'rgb(248, 153, 28)',
                    height: '20px',
                    margin: ' 0 auto',
                  },

                  searchBox: {
                    border: '0.5px solid #818181',
                    borderBottom: '0.5px solid #818181',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: '10px',
                    cursor: 'pointer',
                    listStyle: 'none',
                    width: '100%',
                    height: '48px',
                    margin: '0 auto',
                    backgroundColor: '#fff',
                    // marginRight: '0',
                    marginBottom: '16px',
                  },
                  optionContainer: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '0',
                  },
                  option: {
                    backgroundColor: 'rgb(248, 153, 28)',
                    margin: '3px 0',
                    width: '100%',
                    borderRadius: '5px',
                  },
                }}
                selectionLimit={3}
                required
              />
            </label>

            <div className={styles.uploadAudio}>
              <div className={styles.uploadAudioInner}>
                <label htmlFor="file-input">
                  <AiOutlineCloudUpload size="1.5rem" />
                </label>
                <label htmlFor="file-input">
                  <p className={styles.uploadAudioTip}>
                    {this.props.t('Upload Audio')}
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
              {this.state.uploadImg && (
                <img
                  src={this.state.uploadImg}
                  alt=""
                  className={styles.uploadImage}
                />
              )}
              <div className={styles.uploadImageContent}>
                <AiOutlineCloudUpload className={styles.CreateFormUploadImg} />
                {this.props.t('Upload File')}
              </div>
            </label>
            <button type="submit" className={styles.CreateFormButton}>
              {this.props.t('Submit')}
            </button>
          </div>
        </form>
      </>
    )
  }
}

export default withTranslation()(CreateForm)
