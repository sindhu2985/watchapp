import {Link} from 'react-router-dom'

import './index.css'

const SavedVideosCard = props => {
  const {SavedVideosData} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = SavedVideosData
  const {name} = channel

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="Saved-videos-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="details-container">
          <p className="title">{title}</p>
          <p className="name">{name}</p>
          <p className="view-count">
            {viewCount} views. {publishedAt}
          </p>
        </div>
      </li>
    </Link>
  )
}
export default SavedVideosCard
