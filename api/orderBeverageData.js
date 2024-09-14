import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createOrderBev = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverages`, {
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

const getOrderBevs = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverages.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleOrderBev = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverages/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleOrderBev = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverages/${id}.json`, {
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
  createOrderBev, getOrderBevs, getSingleOrderBev, deleteSingleOrderBev,
};
