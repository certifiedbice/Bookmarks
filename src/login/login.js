import React, { Component } from 'react';
import './login.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h1>Welcome to Bookmarks</h1>
        <div className="login__form">
          <form>
            <h2>Login</h2>
            <div className="login__form__credentials">
              <input type="text" placeholder="Username" name="username" id="username"/>
              <input type="password" placeholder="Password" name="password" id="password"/>
            </div>
            <div className="login__form__controls">
              <div className="login__form__remember">
                <input type="checkbox" name="rememberMe" id="rememberMe"/>
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <input type="submit" value="Sign In" className="login__form__btn"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;