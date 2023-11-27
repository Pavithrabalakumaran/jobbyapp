import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userName, passWord} = this.state
    const userDetails = {userName, passWord}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      METHOD: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passWord: event.target.value})
  }

  render() {
    const {userName, passWord, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-image"
            alt="website logo"
          />
          <div className="input-container">
            <label className="input-label" htmlFor="userName">
              USERNAME
            </label>
            <input
              type="text"
              className="username-input-field"
              id="userName"
              value={userName}
              onChange={this.onChangeUserName}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="passWord">
              PASSWORD
            </label>
            <input
              type="password"
              className="username-input-field"
              id="passWord"
              value={passWord}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          {showSubmitError && <p className="error-msg"> *{errorMsg} </p>}
        </form>
      </div>
    )
  }
}

export default Login
