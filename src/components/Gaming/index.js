import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import Cookies from 'js-cookie'
import {Component} from 'react'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import GamingCard from '../GamingCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    dataList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideos()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,

    viewCount: data.view_count,
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo =>
        this.getFormattedData(eachVideo),
      )
      this.setState({
        dataList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {apiStatus, dataList} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const gamingBgClassName = isDarkTheme
            ? 'gaming-bg-dark'
            : 'gaming-bg-light'
          const colorText = isDarkTheme ? 'dark-color-text' : 'light-color-text'

          const renderLoadingView = () => (
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          )

          const renderFailureView = () => {
            const failureImgUrl = isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

            return (
              <div className="failure-container">
                <img
                  src={failureImgUrl}
                  alt="failure view"
                  className="failure-image"
                />
                <h1 className={`failure-heading ${colorText}`}>
                  Oops! Something Went Wrong
                </h1>
                <p className={`failure-description ${colorText}`}>
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
              </div>
            )
          }

          const renderGamingDetails = () => {
            const headBgColor = isDarkTheme ? 'dark-header' : 'light-header'
            const iconClassName = isDarkTheme ? 'dark-icon' : 'light-icon'
            return (
              <div className="gaming-view-container">
                <div className={`gaming-header-container ${headBgColor}`}>
                  <SiYoutubegaming size={40} className={iconClassName} />
                  <h1 className={`header-name ${colorText}`}>Gaming</h1>
                </div>
                <ul className={`gaming-details-item-container ${colorText}`}>
                  {dataList.map(eachData => (
                    <GamingCard gamingData={eachData} key={eachData.id} />
                  ))}
                </ul>
              </div>
            )
          }

          const renderGamingDetailsList = () => {
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderGamingDetails()
              case apiStatusConstants.failure:
                return renderFailureView()
              case apiStatusConstants.inprogress:
                return renderLoadingView()
              default:
                return null
            }
          }

          return (
            <div
              className={`gaming-app-container ${gamingBgClassName}`}
              data-testid="gaming"
            >
              <Header />
              <div className="gaming-container">
                <Navbar />
                <div className="gaming-responsive-container">
                  {renderGamingDetailsList()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Gaming
