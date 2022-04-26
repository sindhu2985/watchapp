import {Link} from 'react-router-dom'

import './index.css'

const GamingCard = props => {
  const {GamingData} = props
  const {id, title, thumbnailUrl, viewCount} = GamingData

  return (
    <Link to={`/videos/${id}`} className="link-item">
      <li className="trending-list-item">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />
        <p className="title">{title}</p>
        <p className="view-count">{viewCount} views. Watching Worldwide</p>
      </li>
    </Link>
  )
}
export default GamingCard
