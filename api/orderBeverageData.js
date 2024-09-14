import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createOrderBev = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverage`, {
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
  fetch(`${endpoint}/orderbeverage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleOrderBev = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/orderbeverage/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOrderBev = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderbeverage/${id}`, {
    method: 'GET',
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
