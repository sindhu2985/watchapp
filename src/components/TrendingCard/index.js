import {Link} from 'react-router-dom'

import './index.css'

const TrendingCard = props => {
  const {trendingData} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = trendingData
  const {name} = channel

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="trending-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <div className="details-container">
          <p className="title">{title}</p>
          <p className="name">{name}</p>
          <div className="view">
            <p className="view-count">{viewCount} views.</p>
            <p className="published-at">{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default TrendingCard
