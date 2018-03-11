import React from 'react';
import PropTypes from 'prop-types';

import Async from 'react-code-splitting';
import {Route, Switch, withRouter} from 'react-router-dom';

import styled from 'styled-components';
import toastr from 'toastr';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Home = () => <Async load={import('../Home')} />;
const LoginPage = () => <Async load={import('../LoginPage')} />;

class App extends React.Component {
  static defaultProps = {
    className: "",
    auth: {},
    ajaxError: "",
    history: {}
  };

  static propTypes = {
    className: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    ajaxError: PropTypes.string,
    history: PropTypes.object
  };

  state = {};

  setInitialLocation = (auth, user) => {
    if(auth){
      this.props.history.push("/");
    }
    else{
      this.props.history.push("/login");
    }
  }

  /* REACT LIFECYCLE */
  componentWillMount() {
    console.log('App mounting'); // eslint-disable-line no-console
  }
  componentWillReceiveProps(newProps) {
    console.log('App recieves new props'); // eslint-disable-line no-console
    console.log(newProps); // eslint-disable-line no-console
    // we aren't clearing the errors, therefore needs to check if it's same error to prevent multiple showing
    if(newProps.ajaxError !== this.props.ajaxError && newProps.ajaxError !== ""){
      toastr.error(newProps.ajaxError);
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}

function mapStatesToProps(state, ownProps) {
  return {
    auth: state.auth,
    ajaxError: state.ajax.error
  };
}

const StyledApp = styled(App)`
  & {
    height: 100%;
    width: 100%;
    display: inline-block;
    position: relative;
  }
`;

export default withRouter(connect(mapStatesToProps)(StyledApp));
