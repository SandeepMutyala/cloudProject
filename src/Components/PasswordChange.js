import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class PasswordChange extends Component {
  state = {
    verificationcode: "",
    email: "",
    newpassword: "",
    isErrorFree: true
  };

  passwordVerificationHandler = async event => {
    event.preventDefault();
    const formvalid = this.validateFormFields()
    if(formvalid){
      try {
        await Auth.forgotPasswordSubmit(
          this.state.email,
          this.state.verificationcode,
          this.state.newpassword
        );
        this.props.history.push("/changepasswordconfirmation");
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
        if(this.state.verificationcode.length == 0 || this.state.email.length == 0 || this.state.newpassword.length == 0)
        {
          alert("Please enter all fields");
          this.setState({
            isErrorFree: false
          })
          return false
        }else if(this.state.email.match("/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/")){
          alert("Invalid email pattern")
          this.setState({
            isErrorFree: false
          })
          return false
        }else if(this.state.newpassword.match("/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/")){
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
          <p><b>Enter details below to set a new password</b></p>

          <form onSubmit={this.passwordVerificationHandler}>
            <div className="field">
              <p className="control">
                <input className="input" id="verificationcode" placeholder="Enter verification code" type="text" value={this.state.verificationcode} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" id="email" placeholder="Enter email" value={this.state.email} type="email" onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" id="newpassword" placeholder="New password" value={this.state.newpassword} type="password" onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-link">
                  Submit
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default PasswordChange;