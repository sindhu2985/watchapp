import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import Banner from '../Banner'
import HomeCard from '../HomeCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    dataList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getVideos()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
    },
    viewCount: data.view_count,
    publishedAt: formatDistanceToNow(new Date(data.published_at)),
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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

  onEnterSearchInput = () => {
    this.getVideos()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {apiStatus, dataList, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeBgClassName = isDarkTheme ? 'home-bg-dark' : 'home-bg-light'
          const colorText = isDarkTheme ? 'light-color-text' : 'dark-color-text'

          const searchButton = isDarkTheme ? 'dark-button' : 'light-button'

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

          const renderHomeDetails = () => {
            const showDataList = dataList.length > 0
            return (
              <div className="home-view-container">
                <Banner />

                <div className="search-container">
                  <input
                    placeholder="Search Channel"
                    type={`search ${colorText}`}
                    value={searchInput}
                    className="search"
                    onChange={this.onChangeSearchInput}
                    onKeyDown={this.onEnterSearchInput}
                  />
                  <button
                    type="button"
                    className={`search-button ${searchButton}`}
                    onClick={this.getVideos}
                  >
                    <AiOutlineSearch />
                  </button>
                </div>

                {showDataList ? (
                  <ul className={`Home-details-item-container ${colorText}`}>
                    {dataList.map(eachData => (
                      <HomeCard homeData={eachData} key={eachData.id} />
                    ))}
                  </ul>
                ) : (
                  <div className="no-results">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                      alt="no videos"
                      className="no-videos-image"
                    />
                    <h1 className={`No-results-heading ${colorText}`}>
                      No Search results found
                    </h1>
                    <p className={`No-results-para ${colorText}`}>
                      Try different keywords or remove search filter
                    </p>
                    <button
                      type="button"
                      className="NoResultsButton"
                      onClick={this.getVideos}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            )
          }

          const renderHomeDetailsList = () => {
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderHomeDetails()
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
              className={`home-app-container ${homeBgClassName}`}
              data-testid="home"
            >
              <Header />
              <div className="home-container">
                <Navbar />
                <div className="home-responsive-container">
                  {renderHomeDetailsList()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Home
