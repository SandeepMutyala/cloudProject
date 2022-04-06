import React, { Component } from 'react';
import { Auth } from "aws-amplify";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isErrorFree: true
  };

  handleSubmit = async event => {
    event.preventDefault();
    const formvalid = this.validateFormFields()
    if(formvalid){
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthenticationStatus(true);
      this.props.history.push("/dashboard");
    }catch(form_error) {
      this.validateFormFields(form_error)
    }
  }
  };

  validateFormFields = (cognitoErrors) => {
    this.setState({isErrorFree : true});
    if(cognitoErrors){
      alert(cognitoErrors)
      this.setState({
        isErrorFree: false
      })
      return false;
    }else{
        if( this.state.username.length == 0 || this.state.password.length == 0 )
        {
          alert("Please enter all fields");
          this.setState({
            isErrorFree: false
          })
          return false
        }else if(this.state.password.match("/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/")){
          alert("Password should be minimum 8 letters with a special character and a upper case")
          this.setState({
            isErrorFree: false
          })
          return false
        }
    }
    return true
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section formfield">
        <div className="container">
          <h1>Log in</h1>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input className="input" type="text" id="username" placeholder="Enter username or email" value={this.state.username} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" type="password" id="password" placeholder="Password" value={this.state.password} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-link">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Login;