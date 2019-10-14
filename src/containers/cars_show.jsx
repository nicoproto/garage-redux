import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Aside from '../components/aside';
import { removeCar, fetchCar } from '../actions';

class CarsShow extends Component {
  // THIS IS TO FETCH THE SELECTED CAR IF YOU RELOAD
  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  handleClick = () => {
    this.props.removeCar(this.props.history, this.props.car, () => {
      this.props.history.push('/');
      // HISTORY.PUSH REDIRECTS TO HOME PAGE
    });
  }

  render () {
    const car = this.props.car;
    if (!car) {
      return (
        <Aside key="aside" garage={this.props.garage}>
          <Link to="/">Back to garage</Link>
        </Aside>);
    }
    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to garage</Link>
      </Aside>,
      <div className="car-container" key="car">
        <div className="car-card">
          <img className="car-picture" src="/assets/images/logo_square.svg" alt="logo square" />
          <div className="car-details">
            <span>{car.brand} - {car.model}</span>
            <ul>
              <li><strong>Owner:</strong> {car.owner}</li>
            </ul>
            <span className="plate">{car.plate}</span>
          </div>
          <button className="delete" onClick={this.handleClick}>
            <i className="fa fa-trash-o" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    ];
  }
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10);
  return {
    car: state.cars.find(car => car.id === id),
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeCar, fetchCar }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsShow);
