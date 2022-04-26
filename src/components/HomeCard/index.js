import {Link} from 'react-router-dom'

import './index.css'

const HomeCard = props => {
  const {homeData} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = homeData
  const {name, profileImageUrl} = channel
  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="home-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="details-container">
          <img
            src={profileImageUrl}
            alt=" channel logo"
            className="profile-image"
          />
          <div className="logo-details">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <p className="view-count">
              {viewCount} views. {publishedAt}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeCard
