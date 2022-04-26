import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import './index.css'

class Banner extends Component {
  state = {isActive: true}

  onClose = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  render() {
    const {isActive} = this.state
    return isActive ? (
      <div className="banner-container" data-testid="banner">
        <button
          className="close"
          type="button"
          data-tetid="close"
          onClick={this.onClose}
        >
          <ImCross size="20" />
        </button>
        <div className="banner-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="website-logo"
            alt="website logo"
          />
          <p className="description">
            Buy nxtWatch premium prepaid plans with upi
          </p>
          <button className="button" type="button">
            get it now
          </button>
        </div>
      </div>
    ) : null
  }
}
export default Banner
