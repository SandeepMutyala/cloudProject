import React, { Component } from 'react';
import { Auth } from "aws-amplify";

class Register extends Component {
  state = {
    reg_username: "",
    reg_email: "",
    password: "",
    confirmpassword: "",
    isErrorFree: true
  }

  handleSubmit = async event => {
    event.preventDefault();
    const formvalid = this.validateFormFields()
    if(formvalid){
      const { reg_username, password, reg_email } = this.state;
      let job = {
        username : reg_username,
        password : password,
        attributes : {
          email: reg_email
        }
      }
      try {
        const awsResponseObject = await Auth.signUp(job);
        this.props.history.push("/emailVerification");
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
        if( this.state.reg_username.length == 0 || this.state.reg_email.length == 0 || this.state.password.length == 0 || this.state.confirmpassword.length == 0)
        {
          alert("Please enter all fields");
          this.setState({
            isErrorFree: false
          })
          return false
        }else if (this.state.reg_email.match("/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/")){
          alert("Invalid email pattern")
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
        }else if(this.state.password != this.state.confirmpassword){
          alert("Password mismatched")
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
      [event.target.name]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section formfield">
        <div className="container">
          <h6 className='welcome_heading'>Welcome to Winter Cloud</h6>
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input className="input" id="username" name="reg_username" placeholder="Enter username" type="text" value={this.state.reg_username} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" id="email" name="reg_email" placeholder="Enter email" type="text" value={this.state.reg_email} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" id="password" name="password" placeholder="Password"  type="password" value={this.state.password} onChange={this.onInputChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input className="input" id="confirmpassword" name="confirmpassword" placeholder="Confirm password"  type="password" value={this.state.confirmpassword} onChange={this.onInputChange}/>
              </p>
            </div>
            <p>Have an account already? <a href='/login'>Login</a></p>
            <div className="field">
              <p className="control">
                <button className="button is-link">
                  <strong>Submit</strong>
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;