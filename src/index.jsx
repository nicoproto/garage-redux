// EXTERNAL IMPORTS
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

// REACT ROUTER
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

// INTERNAL IMPORTS
import '../assets/stylesheets/application.scss';
import CarsIndex from './containers/cars_index';
import CarsNew from './containers/cars_new';
import CarsShow from './containers/cars_show';
import carsReducer from './reducers/cars_reducer';

const garageName = prompt("What is your garage?") || `garage${Math.floor(10 + (Math.random() * 90))}`;
const initialState = {
  garage: garageName,
  cars: []
};

const reducers = combineReducers({
  garage: (state = null) => state,
  cars: carsReducer,
  form: formReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <div className="view-container">
        <Switch>
          <Route path="/" exact component={CarsIndex} />
          <Route path="/cars/new" exact component={CarsNew} />
          <Route path="/cars/:id" exact component={CarsShow} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
