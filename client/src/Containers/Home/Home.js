import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import { convertDate } from '../../Helpers/timeAndDate';
import { getNewsItems } from '../../Helpers/newsOptions';

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
    pickedNewsSource: false,
    isLoadingNewsItems: false,
    dataToDisplay: null,
  };

  dateSelectedHandler = (e) => {
    const convertedDate = convertDate(e);
    this.setState({ pickedDate: true, pickedDateValue: convertedDate });
  };

  newsSourcePickedHandler = (e) => {
    this.setState({
      pickedNewsSource: true,
      isLoadingNewsItems: true,
    });
    const postData = {
      date: this.state.pickedDateValue,
      newsSite: e,
    };
    axios
      .post(`/reader/single-news-source/`, { data: postData })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  singleItemSelectedHandler = () => {
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

  generateNewsItems = () => {
    const newsItems = getNewsItems();
    return newsItems.map((item) => {
      return (
        <div
          key={item.news}
          style={{ backgroundColor: item.bgColor, color: item.color }}
          onClick={(e) => this.newsSourcePickedHandler(item.news)}
        >
          {item.initials}
        </div>
      );
    });
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
              <label>Pick a date to begin...</label>
              {this.generateCalendar()}
            </div>
          </div>
          {this.state.pickedDate ? (
            <div className={classes.SiteOptionsWrapper}>
              {this.generateNewsItems()}
            </div>
          ) : null}
          <div className={classes.NewsItemsWrapper}>News Items</div>
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
