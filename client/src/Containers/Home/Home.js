import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import Aux from '../../hoc/Aux';

import Spinner from '../../Components/Atoms/Spinner/Spinner';
import Header from '../../Components/Organisms/Header/Header';

class Home extends Component {
  state = {
    isError: false,
    isLoading: false,
    pickedDate: false,
    pickedDateValue: null,
    pickedTime: false,
    pickedTimeValue: null,
    pickedNewSource: null,
    hasNewsItem: false,
    dataToDisplay: null,
  };

  dateSelectedHandler = () => {
    this.setState({ pickedDate: true, pickedDateValue: '03/05/2020' });
  };

  timeSelectedHandler = () => {
    this.setState({ pickedTime: true, pickedTimeValue: [12, 13] });
    axios
      .post('/reader/single-hour/', {
        date: this.state.pickedDateValue,
        lowTime: this.state.pickedDateValue[0],
        highTime: this.state.pickedDateValue[1],
      })
      .then((res) => {
        console.log(res);
        this.setState({ dataToDisplay: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  newsSouceSelectedHandler = () => {
    let clippingId = this.state.dataToDisplay._id;
    axios
      .get(`/reader/${clippingId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Aux>
        {this.isLoading ? <Spinner /> : null}
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
          <div className={classes.SiteOptionsWrapper}>News Options</div>
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
