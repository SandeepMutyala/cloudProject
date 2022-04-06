import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class ForgotPassword extends Component {
  state = {
    email: "",
    isErrorFree: true
  }

  forgotPasswordHandler = async event => {
    event.preventDefault();
    const formvalid = this.validateFormFields()
    if(formvalid){
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('/passwordChange');
    }catch(form_error) {
      this.validateFormFields(form_error)
    }
  }
  }

  validateFormFields = (cognitoErrors) => {
    this.setState({isErrorFree : true});
    if(cognitoErrors){
      alert(cognitoErrors)
      this.setState({
        isErrorFree: false
      })
      return false;
    }else{
        if(this.state.email.length == 0)
        {
          alert("Please enter email id");
          this.setState({
            isErrorFree: false
          })
          return false
        } else if (this.state.email.match("/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/")){
          alert("Invalid email pattern")
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
  }

  render() {
    return (
      <section className="section formfield">
        <div className="container">
          <p>
            Enter your email id or username linked to your account!
          </p>

          <form onSubmit={this.forgotPasswordHandler}>
            <div className="field">
              <p className="control">
                <input className="input" id="email" placeholder="Enter email id or user name" value={this.state.email} type="email" onChange={this.onInputChange}/>
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

export default ForgotPassword;