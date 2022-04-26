import {Redirect} from 'react-router-dom'

import {AiFillFire} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {Component} from 'react'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import SavedVideosCard from '../SavedVideosCard'

import './index.css'

class SavedVideos extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos} = value
          const savedVideosBgClassName = isDarkTheme
            ? 'savedVideo-bg-dark'
            : 'savedVideo-bg-light'
          const colorText = isDarkTheme ? 'light-color-text' : 'dark-color-text'

          const renderSavedVideosDetails = () => {
            const headBgColor = isDarkTheme ? 'dark-header' : 'light-header'
            const iconClassName = isDarkTheme ? 'dark-icon' : 'light-icon'
            const showSavedVideos = savedVideos.length > 0
            return showSavedVideos ? (
              <div className="savedVideos-view-container">
                <div className={`SavedVideos-header-container ${headBgColor}`}>
                  <AiFillFire size={40} className={iconClassName} />
                  <h1 className={`header-name ${colorText}`}>SavedVideos</h1>
                </div>
                <ul
                  className={`Saved-videos-details-item-container ${colorText}`}
                >
                  {savedVideos.map(eachData => (
                    <SavedVideosCard
                      savedVideosData={eachData}
                      key={eachData.id}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="no-saved-Videos-results">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                  className="no-saved-videos-image"
                />
                <h1 className={`no-saved-videos-heading ${colorText}`}>
                  No saved videos found
                </h1>
                <p className={`no-saved-videos-para ${colorText}`}>
                  You can save your videos while watching them
                </p>
              </div>
            )
          }

          return (
            <div
              className={`savedVideos-app-container ${savedVideosBgClassName}`}
              data-testid="savedVideos"
            >
              <Header />
              <div className="savedVideos-container">
                <Navbar />
                <div className="savedVideos-responsive-container">
                  {renderSavedVideosDetails()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
