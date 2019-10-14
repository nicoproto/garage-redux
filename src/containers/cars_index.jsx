// EXTERNAL IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

// INTERNAL IMPORTS
import { fetchCars } from '../actions/index';
import Aside from '../components/aside';

class CarsIndex extends Component {
  componentDidMount() {
    this.props.fetchCars(this.props.garage);
  }

  renderCars() {
    return this.props.cars.map((car) => {
      return (
        <div key={car.id} className="car-smallad">
          <Link to={`/cars/${car.id}`} key={car.id} />
          <img className="car-logo" src="assets/images/logo_square.svg" alt="square logo" />
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {car.owner}</li>
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    // CHECK IF THERE ARE NO CARS
    if (this.props.cars.length === 0) {
      // USING AN ARRAY SO I DONT NEED TO WRAP IT INTO A DIV
      return [
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/cars/new">Add a car</Link>
        </Aside>,
        <div className="no-car" key="nocar">No car yet</div>
      ];
    }

    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/cars/new">Add a car</Link>
      </Aside>,
      <div className="list-container" key="cars">
        {this.renderCars()}
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
