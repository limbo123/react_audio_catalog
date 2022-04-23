import { Component } from 'react'
import styles from './HomePage.module.css'
import { HiLightningBolt } from 'react-icons/hi'
import { BsSuitHeartFill } from 'react-icons/bs'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import { PacmanLoader } from 'react-spinners'

import NewReleasesList from '../../components/NewReleasesList/NewReleasesList'
import TopSongs from '../../components/TopSongs/TopSongs'

axios.defaults.baseURL = 'https://app-audio.herokuapp.com/api/'

class HomePage extends Component {
  state = {
    genre: 'all',
    audios: [],
    loading: true,
  }

  componentDidMount() {
    axios
      .get('audios/mixes/all')
      .then((response) =>
        this.setState({ audios: response.data, loading: false }),
      )
      .catch((error) => console.error(error))
  }

  handleSelect = async (event) => {
    await this.setState({ genre: event.target.value })

    this.setState({ loading: true, audios: [] })

    axios
      .get(`audios/mixes/${this.state.genre}`)
      .then((response) =>
        this.setState({ audios: response.data, loading: false }),
      )
      .catch((error) => console.error(error))
  }

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.titleCont}>
            <div>
              {' '}
              <HiLightningBolt color="#F8991C" className={styles.lightning} size="2rem" />
              <h2 className={styles.homeTitle}>
                <div>{this.props.t('New releases header')}</div>
              </h2>
            </div>
          </div>

          <NewReleasesList name="audios" handleModal={this.props.handleModal} />
        </div>

        <div className={styles.container}>
          <div className={styles.titleCont}>
            <div>
              {' '}
              <BsSuitHeartFill
                color="#F8991C"
                size="2rem"
                className={styles.lightning}
              />
              <h2 className={styles.homeTitle}>
                {this.props.t('Top songs header')}{' '}
              </h2>
            </div>
            <select name="genres" id="genres" onChange={this.handleSelect}>
              <option value="all">{this.props.t('All Genres')}</option>
              <option value="pop">{this.props.t('Pop')}</option>
              <option value="rock">{this.props.t('Rock')}</option>
              <option value="jazz">{this.props.t('Jazz')}</option>
              <option value="traditional">{this.props.t('Traditional')}</option>
              <option value="hip-hop">{this.props.t('Hip-hop')}</option>
              <option value="electronic">{this.props.t('Electronic')}</option>
              <option value="folk">{this.props.t('Folk')}</option>
              <option value="indi">{this.props.t('Indi')}</option>
              <option value="country">{this.props.t('Country')}</option>
              <option value="classical">{this.props.t('Classical')}</option>
            </select>

            <h2 className={styles.homeTitle}></h2>
          </div>

          {this.state.loading && (
            <div className="loader">
              <PacmanLoader
                color="#F8991C"
                loading={true}
                size={30}
                speedMultiplier="1.5"
              />
            </div>
          )}

          <TopSongs
            audios={this.state.audios}
            handleModal={this.props.handleModal}
          />
        </div>
      </>
    )
  }
}

export default withTranslation()(HomePage)
