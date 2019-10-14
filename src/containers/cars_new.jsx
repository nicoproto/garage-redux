// EXTERNAL IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';

// INTERNAL IMPORTS
import { createCar } from '../actions';
import Aside from '../components/aside';

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(this.props.garage, values, () => {
      this.props.history.push('/');
      // HISTORY.PUSH REDIRECTS TO HOME PAGE
    });
  }

  // REFACTORED
  renderInput = (htmlFor, label, name, placeholder) => {
    return (
      <div className="form-group">
        <label htmlFor={htmlFor}>
          {label}
        </label>
        <Field
          name={name}
          type="text"
          placeholder={placeholder}
          component="input"
          className="form-control"
        />
      </div>
    );
  }

  render () {
    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to my garage</Link>
      </Aside>,
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderInput("InputBrand", "Brand", "brand", "Aston Martin")}
          {this.renderInput("InputModel", "Model", "model", "DB Mark III")}
          {this.renderInput("InputOwner", "Owner", "owner", "James Bond")}
          {this.renderInput("InputPlate", "Plate", "plate", "DB Mark III")}
          <button type="submit">Add car</button>
        </form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCar }, dispatch);
}

export default reduxForm({
  form: 'newCarForm'
})(
  connect(mapStateToProps, mapDispatchToProps)(CarsNew)
);
