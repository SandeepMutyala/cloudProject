import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class ChangePassword extends Component {
  state = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    isErrorFree: true
  }


  handleSubmit = async event => {
    event.preventDefault();
    const formvalid = this.validateFormFields()
    if(formvalid){
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(
          user,
          this.state.oldpassword,
          this.state.newpassword
        );
        this.props.history.push("/passwordChange");
      } catch (form_error) {
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
        if(this.state.oldpassword.length == 0 || this.state.newpassword.length == 0 || this.state.confirmpassword.length == 0)
        {
          alert("Please enter all fields");
          this.setState({
            isErrorFree: false
          })
          return false
        }else if(this.state.newpassword != this.state.confirmpassword){
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
  }

  render() {
    return (
      <section className="section formfield">
        <div className="container">
          <h1 className='welcome_heading'>Change Password</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input className="input" type="password" id="oldpassword" placeholder="Old password" value={this.state.oldpassword} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" type="password" id="newpassword" placeholder="New password" value={this.state.newpassword} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" type="password" id="confirmpassword" placeholder="Confirm password" value={this.state.confirmpassword} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-link">Change password</button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ChangePassword;