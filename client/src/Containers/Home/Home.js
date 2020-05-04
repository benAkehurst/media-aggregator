import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import Aux from '../../hoc/Aux';

import Header from '../../Components/Organisms/Header/Header';

class Home extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.HeaderWrapper}>
          <header>
            <Header
              headerBgColor={'primary'}
              hasText={true}
              headerText={'UK News'}
            />
          </header>
        </div>
        <div className={classes.SelectorWrapper}>
          <div className={classes.DateTimeWrapper}>
            <div className={classes.CalenderWrapper}>Calendar</div>
            <div className={classes.TimesWrapper}>Times</div>
          </div>
          <div className={classes.SiteOptionsWrapper}>Options</div>
        </div>
        <div className={classes.ViewerWrapper}>
          <div className={classes.NewsImageWrapper}>Image</div>
          <div className={classes.NewsHeadlineWrapper}>Headline</div>
          <div className={classes.SharingWrapper}>Sharing</div>
        </div>
      </Aux>
    );
  }
}

export default Home;
