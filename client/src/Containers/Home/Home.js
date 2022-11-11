import React, { Component } from 'react';
import classes from './Home.module.css';
import axios from '../../axios-connector';

import { convertDate } from '../../Helpers/timeAndDate';
import { getNewsItems } from '../../Helpers/newsOptions';

import Aux from '../../hoc/Aux';
import Calendar from 'react-calendar';

import Spinner from '../../Components/Atoms/Spinner/Spinner';
import Image from '../../Components/Atoms/Image/Image';
import Header from '../../Components/Organisms/Header/Header';

class Home extends Component {
  state = {
    isError: false,
    isErrorMessage: null,
    isLoading: false,
    pickedDate: false,
    pickedDateValue: null,
    pickedNewsSource: false,
    isLoadingNewsItems: false,
    newsDataFromServer: null,
    singleItem: false,
    singleItemData: null,
  };

  dateSelectedHandler = (e) => {
    const convertedDate = convertDate(e);
    this.setState({ pickedDate: true, pickedDateValue: convertedDate });
  };

  newsSourcePickedHandler = (e) => {
    this.setState({
      isLoading: true,
      pickedNewsSource: true,
      isLoadingNewsItems: true,
    });
    axios
      .get(
        `/reader/single-news-source/?newsSite=${e}&date=${this.state.pickedDateValue}`
      )
      .then((res) => {
        if (res.data.success) {
          this.setState({
            isLoading: false,
            newsDataFromServer: res.data.data,
            isLoadingNewsItems: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  singleItemSelectedHandler = (id) => {
    this.setState({ isLoading: true });
    let clippingId = id;
    axios
      .get(`/reader?clippingId=${clippingId}`)
      .then((res) => {
        if (res.data.status) {
          this.setState({
            isLoading: false,
            singleItem: true,
            singleItemData: res.data.data,
          });
        }
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

  generateNewsSources = () => {
    const newsSources = getNewsItems();
    return newsSources.map((item) => {
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

  generateNewsItems = () => {
    const newsItems = [...this.state.newsDataFromServer];
    return newsItems.map((item) => {
      let date = new Date(item.created_at);
      return (
        <div
          key={item._id}
          onClick={(e) => this.singleItemSelectedHandler(item._id)}
        >
          {date.toISOString().replace(/^[^:]*([0-2]\d:[0-5]\d).*$/, '$1')}
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
              {this.generateNewsSources()}
            </div>
          ) : null}
          {this.state.newsDataFromServer ? (
            <div className={classes.NewsItemsWrapper}>
              {this.generateNewsItems()}
            </div>
          ) : null}
        </div>
        {this.state.singleItem ? (
          <div className={classes.ViewerWrapper}>
            <div className={classes.NewsImageWrapper}>
              <Image
                imageLink={this.state.singleItemData.screenshotUrl}
                altText={'news screenshot'}
                size="large"
              />
            </div>
            <div className={classes.NewsHeadlineWrapper}>
              <h3>{this.state.singleItemData.headline}</h3>
            </div>
          </div>
        ) : null}
      </Aux>
    );
  }
}

export default Home;
