import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {FiLogOut} from 'react-icons/fi'
import {MdPlaylistAdd} from 'react-icons/md'
import {ImCross} from 'react-icons/im'
import Popup from 'reactjs-popup'

import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      const onToggleTheme = () => {
        toggleTheme()
      }
      const websiteLogoUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      const HeaderBgClassName = isDarkTheme
        ? 'header-bg-dark'
        : 'header-bg-light'
      const themeImage = isDarkTheme ? (
        <BsBrightnessHigh size="30" />
      ) : (
        <BsMoon size="30" />
      )
      const colorText = isDarkTheme ? 'light-color-text' : 'dark-color-text'
      const cancelColorText = isDarkTheme ? 'dark-cancel' : 'light-cancel'

      const onConfirm = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className={`header-container ${HeaderBgClassName}`}>
          <Link to="/">
            <img
              src={websiteLogoUrl}
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <div className="header-large-container">
            <button
              type="button"
              onClick={onToggleTheme}
              data-testid="theme"
              className={`theme-button ${colorText}`}
            >
              {themeImage}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile"
            />
            <Popup
              modal
              trigger={
                <button type="button" className="logout-button" testid="logout">
                  Logout
                </button>
              }
              className={`popup-content ${HeaderBgClassName}`}
            >
              {close => (
                <div className="popup-container">
                  <button
                    className="close-button"
                    type="button"
                    testid="closeButton"
                    onClick={() => close()}
                  >
                    <ImCross size="30" />
                  </button>
                  <p className={`logout-description ${colorText}`}>
                    Are you sure you want to logout?
                  </p>

                  <div className="button-container">
                    <button
                      className={`cancel-button ${cancelColorText}`}
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-button"
                      type="button"
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
          <div className="header-small-container">
            <button
              type="button"
              onClick={onToggleTheme}
              testid="theme"
              className={`theme-button ${colorText}`}
            >
              {themeImage}
            </button>
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className="hamburger-button"
                  testid="hamburger button"
                >
                  <GiHamburgerMenu size="30" />
                </button>
              }
              className={`popup-content-hamburger ${HeaderBgClassName}`}
            >
              {close => (
                <div className="popup-menu-container">
                  <button
                    className="close-button"
                    type="button"
                    testid="closeButton"
                    onClick={() => close()}
                  >
                    <ImCross size="30" />
                  </button>
                  <ul className="menu-list">
                    <li className="menu-item">
                      <Link
                        to="/"
                        className={`menu-link ${colorText}`}
                        onClick={() => close()}
                      >
                        <HiHome size="30" /> Home
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link
                        to="/trending"
                        className={`menu-link ${colorText}`}
                        onClick={() => close()}
                      >
                        <AiFillFire size="30" /> Trending
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link
                        to="/gaming"
                        className={`menu-link ${colorText}`}
                        onClick={() => close()}
                      >
                        <SiYoutubegaming size="30" /> Gaming
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link
                        to="/saved-videos"
                        className={`menu-link ${colorText}`}
                        onClick={() => close()}
                      >
                        <MdPlaylistAdd size="30" /> Saved Videos
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </Popup>
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className="logout-mobile-button"
                  testid="logout"
                >
                  <FiLogOut size={25} />
                </button>
              }
              className={`popup-content ${HeaderBgClassName}`}
            >
              {close => (
                <div className="popup-container">
                  <button
                    className="close-button"
                    type="button"
                    testid="closeButton"
                    onClick={() => close()}
                  >
                    <ImCross size="30" />
                  </button>
                  <p className={`logout-description ${colorText}`}>
                    Are you sure you want to logout?
                  </p>

                  <div className="button-container">
                    <button
                      className={`cancel-button ${cancelColorText}`}
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="confirm-button"
                      type="button"
                      onClick={onConfirm}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(Header)
