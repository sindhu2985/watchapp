import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Navbar from '../Navbar'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundBgClassName = isDarkTheme ? 'home-bg-dark' : 'home-bg-light'
      const colorText = isDarkTheme ? 'light-color-text' : 'dark-color-text'
      const notFoundUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div className={`not-found-app-container ${notFoundBgClassName}`}>
          <Header />
          <div className="not-found-container">
            <Navbar />
            <div className="not-found-responsive-container">
              <img src={notFoundUrl} alt="not found" className="image" />
              <h1 className={`not-found-heading ${colorText}`}>
                Page Not Found
              </h1>
              <p className={`not-found-description ${colorText}`}>
                We are sorry,the page you requested could not be found.
              </p>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
