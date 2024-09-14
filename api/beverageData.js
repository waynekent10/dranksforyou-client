import { clientCredentials } from '../utils/client';

const createBeverage = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getBeverages = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleBeverage = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateBeverage = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});
const deleteSingleBeverage = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createBeverage, getBeverages, getSingleBeverage, updateBeverage, deleteSingleBeverage,
};
