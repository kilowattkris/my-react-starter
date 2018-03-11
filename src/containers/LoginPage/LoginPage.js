import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Redirect } from 'react-router';

import styled from 'styled-components';

export class LoginPage extends React.Component {
  static defaultProps = {
    className: ""
  };

  static propTypes = {
    className: PropTypes.string
  };

  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  };

  login = (event) => {
    event.preventDefault();
    this.setState({emailError: ""});
    this.setState({passwordError: ""});
  }

  updateEmail = (e) => {
    this.setState({email: e.target.value});
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value});
  }

  /* REACT LIFECYCLE */
  componentWillMount() {
    console.log('LoginPage mounting'); // eslint-disable-line no-console
  }
  componentWillUnmount() {
    console.log('LoginPage unmounting'); // eslint-disable-line no-console
  }
  componentWillReceiveProps(newProps) {
    console.log('LoginPage recieved new props: '); // eslint-disable-line no-console
    console.log(newProps); // eslint-disable-line no-console
  }

  render() {
    return (
      <h1>Login</h1>
    );
  }
}

function mapStatesToProps(state, ownProps) {
  return {
  };
}

const StyledLoginPage = styled(LoginPage)`
  && {
  }
`;

export default connect(mapStatesToProps)(StyledLoginPage);
