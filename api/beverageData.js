import { clientCredentials } from '../utils/client';

const getBeverages = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage?user=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
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

const updateBeverage = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/beverage/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
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

export {
  getBeverages, getSingleBeverage, updateBeverage, deleteSingleBeverage, createBeverage,
};
