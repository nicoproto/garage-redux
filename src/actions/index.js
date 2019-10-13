// TODO: add and export your own actions
export const FETCH_CARS = "FETCH_CARS";
export const CART_CREATED = "CART_CREATED";

export function fetchCars(garage) {
  const promise = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`).then(response => response.json());

  return {
    type: FETCH_CARS,
    payload: promise
  };
}

export function createCar(garage, body) {
  const request = fetch(`https://wagon-garage-api.herokuapp.com/${garage}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json());

  return {
    type: CART_CREATED,
    payload: request
  };
}
