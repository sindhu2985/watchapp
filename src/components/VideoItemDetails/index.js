import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inprogress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    liked: false,
    disliked: false,
    saved: false,
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnail_url: data.thumbnail_url,
    name: data.channel.name,
    profileImageUrl: data.channel.profile_image_url,
    subscriberCount: data.channel.subscriber_count,
    viewCount: data.view_count,
    publishesAt: formatDistanceToNow(new Date(data.published_at)),
    description: data.description,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.video_details)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  isDisliked = () => {
    const {liked, disliked} = this.state
    if (liked) {
      this.setState({liked: false})
    }
    if (disliked) {
      this.setState({disliked: false})
    } else {
      this.setState({disliked: true})
    }
  }

  isLiked = () => {
    const {liked, disliked} = this.state
    if (disliked) {
      this.setState({disliked: false})
    }
    if (liked) {
      this.setState({liked: false})
    } else {
      this.setState({liked: true})
    }
  }

  isSaved = async () => {
    const {saved} = this.state
    if (saved) {
      await this.setState({saved: false})
    } else {
      await this.setState({saved: true})
    }
  }

  render() {
    const {videoDetails, apiStatus, saved, liked, disliked} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      description,
      subscriberCount,
      name,
      profileImageUrl,
    } = videoDetails

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, addSavedVideos} = value
          const videoBgClassName = isDarkTheme
            ? 'video-bg-dark'
            : 'video-bg-light'
          const colorText = isDarkTheme ? 'light-color-text' : 'dark-color-text'

          const onSave = () => {
            this.isSaved()
            addSavedVideos(videoDetails)
          }

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

          const renderVideoDetails = () => {
            const likeIcon = liked ? 'liked-color' : 'unlike-color'
            const disLikeIcon = disliked ? 'liked-color' : 'unlike-color'
            const saveIcon = saved ? 'liked-color' : 'unlike-color'
            const saveText = saved ? 'saved' : 'save'
            return (
              <div className="video-container">
                <div className="video-frame-container">
                  <ReactPlayer
                    url={videoUrl}
                    controls
                    className="react-player"
                  />
                  <p className={`title ${colorText}`}>{title}</p>
                </div>
                <div className="attribute-container">
                  <p className={`views-count ${colorText}`}>
                    {viewCount} views . {publishedAt}
                  </p>
                  <div className="like-container">
                    <button
                      className={`icons ${likeIcon}`}
                      type="button"
                      onClick={this.isLiked}
                    >
                      <AiOutlineLike size={20} /> Like
                    </button>
                    <button
                      className={`icons ${disLikeIcon}`}
                      type="button"
                      onClick={this.isDisLiked}
                    >
                      <AiOutlineDislike size={20} /> Dislike
                    </button>
                    <button
                      className={`icons ${saveIcon}`}
                      type="button"
                      onClick={onSave}
                    >
                      <MdPlaylistAdd size={20} /> {saveText}
                    </button>
                  </div>
                </div>
                <hr className="hr-line" />
                <div className="channel-container">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="channel-logo"
                  />
                  <div className="content-container">
                    <p className={`name ${colorText}`}>{name}</p>
                    <p className="subscriber">{subscriberCount}</p>
                  </div>
                </div>
                <p className={`description ${colorText}`}>{description}</p>
              </div>
            )
          }

          const renderVideoDetailsList = () => {
            switch (apiStatus) {
              case apiStatusConstants.success:
                return renderVideoDetails()
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
              className={`video-app-details-container ${videoBgClassName}`}
              data-testid="videoItemDetails"
            >
              <Header />
              <div className="video-details-container">
                <Navbar />
                <div className="video-responsive-container">
                  {renderVideoDetailsList()}
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
