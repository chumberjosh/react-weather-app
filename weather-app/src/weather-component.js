import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { location: "" };
  }

  componentDidMount() {
    console.log(this.state.location);
  }

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
    }
    return (
      <div style={display}>
        <img src={this.props.image}></img>
        {/* <p>new component</p> */}
        <p>{this.props.location}</p>
        The Current Temperature in {this.props.location} is{" "}
        {this.props.weather_descriptions} at {this.props.temperature} degrees
        <p style={small}>Last updated at {this.props.time}</p>
      </div>
    );
  }
}

export default WeatherDisplay;
