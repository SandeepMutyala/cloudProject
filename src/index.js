import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import config from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognitoConfiguration.REGION,
    userPoolId: config.cognitoConfiguration.USER_POOL_ID,
    userPoolWebClientId: config.cognitoConfiguration.APP_CLIENT_ID
  }
});

ReactDOM.render(<App />, document.getElementById('root'));