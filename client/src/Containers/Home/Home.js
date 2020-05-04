import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import { convertDate } from '../../Helpers/timeAndDate';

import Aux from '../../hoc/Aux';
import Calendar from 'react-calendar';

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

  dateSelectedHandler = (e) => {
    const convertedDate = convertDate(e);
    this.setState({ pickedDate: true, pickedDateValue: convertedDate });
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

  generateSpinner = () => {
    return (
      <div className={classes.SpinnerContainer}>
        <Spinner size="medium" color="black" />
      </div>
    );
  };

  generateHeader = () => {
    return (
      <Header headerBgColor={'primary'} hasText={true} headerText={'UK News'} />
    );
  };

  generateCalendar = () => {
    return <Calendar onChange={(e) => this.dateSelectedHandler(e)} />;
  };

  render() {
    return (
      <Aux>
        {this.state.isLoading ? this.generateSpinner() : null}
        <div className={classes.HeaderWrapper}>
          <header>{this.generateHeader()}</header>
        </div>
        <div className={classes.SelectorWrapper}>
          <div className={classes.DateTimeWrapper}>
            <div className={classes.CalenderWrapper}>
              {this.generateCalendar()}
            </div>
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
