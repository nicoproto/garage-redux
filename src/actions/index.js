// TODO: add and export your own actions
export const FETCH_CARS = "FETCH_CARS";
export const FETCH_CAR = "FETCH_CAR";
export const CART_CREATED = "CART_CREATED";
export const REMOVE_CAR = "REMOVE_CAR";

export function fetchCars(garage) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`)
    .then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function fetchCar(id) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/cars/${id}`)
    .then(response => response.json());

  return {
    type: FETCH_CAR,
    payload: promise
  };
}

export function createCar(garage, body, callback) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json()).then(() => callback());

  return {
    type: CART_CREATED,
    payload: request
  };
}

export function removeCar(history, car, callback) {
  fetch(`https://wagon-garage-api.herokuapp.com/cars/${car.id}`, {
    method: 'DELETE'
  }).then(r => r.json()).then(() => callback());

  return {
    type: 'REMOVE_CAR',
    payload: car
  };
}
