import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'

import {Link} from 'react-router-dom'
import {Component} from 'react'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const isDarkTheme = value
          const navbarBgClassName = isDarkTheme
            ? 'header-bg-dark'
            : 'header-bg-light'
          const navbarTextColor = isDarkTheme
            ? 'light-color-text'
            : 'dark-color-text'
          return (
            <div className={`navbar-container ${navbarBgClassName}`}>
              <ul className="navbar-list">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${navbarTextColor}`}>
                    <HiHome size="30" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/trending"
                    className={`nav-link ${navbarTextColor}`}
                  >
                    <AiFillFire size="30" /> Trending
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gaming" className={`nav-link ${navbarTextColor}`}>
                    <SiYoutubegaming size="30" /> Gaming
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/saved-videos"
                    className={`nav-link ${navbarTextColor}`}
                  >
                    <MdPlaylistAdd size="30" /> saved videos
                  </Link>
                </li>
              </ul>
              <div className="contact-container">
                <p className={`contact-heading ${navbarTextColor}`}>
                  CONTACT US
                </p>
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="facebook-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="twitter-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="linked-in-logo"
                  />
                </div>
                <p className={`contact-description ${navbarTextColor}`}>
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Navbar
