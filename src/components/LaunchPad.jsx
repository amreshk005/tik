import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { fetchData, emptyReducer } from "../redux/action";

class LaunchPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityid: {
        city1: "4699066",
        city2: "3143244",
        city3: "1277333",
        city4: "1850147",
        city5: "1880252",
      },
      winner: "",
      counter: 10,
    };
  }

  handleInput = (e) => {
    let { name, value } = e.target;
    this.setState({
      cityid: {
        ...this.state.cityid,
        [name]: value,
      },
    });
  };
  handleSubmit = () => {
    this.setState({
      counter: 10,
    });
    for (let id in this.state.cityid) {
      this.props.fetchData(this.state.cityid[id]);
    }
    const interval = setInterval(() => {
      this.setState({
        counter: this.state.counter - 1,
      });
      if (this.state.counter === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.launchPad.length === 5) {
      console.log(nextProps.launchPad);
      let maxIndex = 0;
      nextProps.launchPad.forEach((e, index) => {
        if (nextProps.launchPad[maxIndex].temp < e.temp) {
          maxIndex = index;
        } else if (nextProps.launchPad[maxIndex].temp === e.temp) {
          if (nextProps.launchPad[maxIndex].speed < e.speed) {
            maxIndex = index;
          }
        }
      });
      return { winner: maxIndex };
    }
    return null;
  }
  render() {
    console.log(this.state.winner);
    let imgStyle = {
      width: "18%",
      border: "3px solid red",
    };
    return (
      <div className="col-12 d-flex flex-column">
        <div className="col-12 mt-3">
          <p className="h4">Enter the LaunchPad City Id</p>
          <div className="row mt-3 w-100 flex-nowrap">
            {["city1", "city2", "city3", "city4", "city5"].map((e) => (
              <input key={uuidv4()} name={e} value={this.state.cityid[e]} onChange={this.handleInput} className="form-control" type="text" placeholder="city id 1" />
            ))}
          </div>
        </div>
        <div className="row mt-5 justify-content-around">
          {["LP1.jpg", "LP2.jpg", "LP3.jpg", "LP4.jpg", "LP5.jpg"].map((e, index) => (
            <img key={uuidv4()} style={{ ...(this.state.winner === index ? imgStyle : { width: "18%" }) }} src={`/launchpads/${e}`} alt="launchpad-1" />
          ))}
        </div>
        <div className="col mt-5 d-flex flex-column h-100 mb-5">
          <button className=" btn btn-danger w-25" type="button" onClick={this.handleSubmit}>
            Attempt to Launch
          </button>
          <button className=" btn btn-primary w-25 mt-3 mb-4" type="button">
            CountDown <span className="badge badge-light">{this.state.counter}</span>
          </button>
        </div>
        <div>{this.state.counter === 0 ? <img className="w-25 mt-5" src="/launchpads/Launch.gif" alt="launcpad_gif" /> : ""}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    launchPad: state.launchPad,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (payload) => dispatch(fetchData(payload)),
    emptyReducer: () => dispatch(emptyReducer()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LaunchPad);
