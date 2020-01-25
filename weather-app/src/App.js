import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import WeatherDisplay from "./weather-component";
import { Row, Col } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewInfo: false,
      location: "",
      autotitle: "",
      data: "",
      showDidYouMean: false
    };
  }

  componentDidMount() {
    this.getDataAxios();
  }

  apiUrl =
    "http://api.weatherstack.com/current?access_key=150142f3b11e4885b9a843d12674b79b&query=";

  async getDataAxios() {
    const response = await axios.get(this.apiUrl + this.state.location);
    console.log(response.data);
    this.state.data = response.data;
    // http://api.weatherstack.com/current?access_key=150142f3b11e4885b9a843d12674b79b&query=birmingham
  }

  viewInfo = () => {
    // this.setState.viewInfo = true
    // this.state.viewInfo = true
    this.setState({
      viewInfo: true
    });
  };

  setLocation(location) {
    this.setState({
      location: location
    });
  }

  myChangeHandler = event => {
    this.setState({ location: event.target.value });
    this.getDataAxios();
    // if (!this.state.data.location.name === this.state.location) {
    // this.showDid();
    // }
  };

  showDid() {
    console.log("show did you mean");
    this.setState({
      showDidYouMean: true
    });
  }

  render() {
    const info =
      "started 10:30am, finished: 12:04am, API = https://weatherstack.com/ free plan -> API url example = http://api.weatherstack.com/current?access_key=150142f3b11e4885b9a843d12674b79b&query=birmingham";
    const infoStyle = {
      color: "red"
    };
    const container = {
      width: "80%",
      marginLeft: "10%",
      textAlign: "center"
    };
    return (
      <div style={container}>
        {this.state.viewInfo ? (
          <p>App info: {info}</p>
        ) : (
          // <h1>Please choose a location!</h1>
          <div></div>
        )}
        <button onClick={this.viewInfo}>View app info</button>
        <form>
          {this.state.data.location ? (
            <h1>What is the weather in {this.state.data.location.name}?</h1>
          ) : (
            <h1>Please choose a location!</h1>
          )}

          <Row>
            <Col>
              <p>Please enter your location:</p>
              <input
                type="text"
                hint="choose location"
                onChange={this.myChangeHandler}
              />
            </Col>
          </Row>
          {this.state.showDidYouMean ? (
            <p style={infoStyle}>
              did you mean {this.state.data.location.name}?
            </p>
          ) : (
            // <p onClick={this.setLocation(this.state.data.location.name)} style={infoStyle}>did you mean {this.state.data.location.name}</p>
            <div></div>
          )}

          {this.state.data.location ? (
            <div>
              <p>Data recieved for {this.state.data.location.name}</p>

              <WeatherDisplay
                date={this.state.data.localtime}
                image={this.state.data.current.weather_icons}
                location={this.state.data.location.name}
                weather_descriptions={
                  this.state.data.current.weather_descriptions
                }
                temperature={this.state.data.current.temperature}
                time={this.state.data.current.observation_time}
              ></WeatherDisplay>
            </div>
          ) : (
            <h1>No data</h1>
          )}
        </form>
      </div>
    );
  }
}

export default App;
