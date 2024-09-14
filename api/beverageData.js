import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createBeverage = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beverages`, {
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
  fetch(`${endpoint}/beverages.json`, {
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
  fetch(`${endpoint}/beverages/${id}`, {
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
  fetch(`${endpoint}/beverages/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
const deleteSingleBeverage = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/beverages/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createBeverage, getBeverages, getSingleBeverage, updateBeverage, deleteSingleBeverage,
};
