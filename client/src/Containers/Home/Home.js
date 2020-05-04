import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import Aux from '../../hoc/Aux';

class Home extends Component {
  render() {
    return (
      <Aux>
        <div>Home</div>
      </Aux>
    );
  }
}

export default Home;
