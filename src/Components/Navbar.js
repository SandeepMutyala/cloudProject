import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

export default class Navbar extends Component {
  onLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthenticationStatus(false);
    }catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h3 className='heading'>WinterCloud</h3>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/"className="button is-link linkcss">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-link linkcss">
                      <strong>Log in</strong>
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <div onClick={this.onLogOut} className="button is-link">
                    Log out
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}