import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "react-bootstrap";
import { Row, Col } from "react-bootstrap";

class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      minusDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() - 1);

    var today = new Date(),
      plusDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        (today.getDate() + 1);

    this.state = {
      location: "",
      newUrl: "",
      minusDate: minusDate,
      plusDate: plusDate,
      showInfo: false
    };
  }

  componentDidMount() {
    console.log(this.state.date);
  }

  viewYesterday = () => {
    this.setState({
      newUrl:
        "http://api.weatherstack.com/historical?access_key=150142f3b11e4885b9a843d12674b79b&query=" +
        this.props.location +
        "&historical_date=" +
        this.state.minusDate,

      showInfo: true
    });
  };

  viewTomorrow = () => {
    this.setState({
      newUrl:
        "http://api.weatherstack.com/historical?access_key=150142f3b11e4885b9a843d12674b79b&query=" +
        this.props.location +
        "&historical_date=" +
        this.state.plusDate,

      showInfo: true
    });
  };

  render() {
    const display = {
      textAlign: "center",
      fontWeight: "bold",
      width: "80%",
      padding: "10%",
      backgroundColor: "lightBlue"
    };
    const small = {
      fontWeight: "100",
      fontSize: "12px"
    };

    return (
      <div style={display}>
        <img src={this.props.image}></img>
        {/* <p>new component</p> */}
        <p>{this.props.location}</p>
        The Current Temperature in {this.props.location} is{" "}
        {this.props.weather_descriptions} at {this.props.temperature} degrees
        <p style={small}>Last updated at {this.props.time}</p>
        <Row>
          <Col>
            <h5 onClick={this.viewYesterday}>View yesterdays data</h5>
            <h5 onClick={this.viewTomorrow}>View tomorrows data</h5>
          </Col>
        </Row>
        <p>{this.state.newUrl}</p>
        {this.state.showInfo ? (
          <p>
            This doesn't work as it requires the premium subscription, but this
            would be the API URL if it did work{" "}
          </p>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default WeatherDisplay;
