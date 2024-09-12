import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createIngredient = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ingredients`, {
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

const getIngredients = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ingredients/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateIngredient = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ingredients/${id}`, {
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

const deleteSingleIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/ingredients/${id}.json`, {
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
  createIngredient, getIngredients, getSingleIngredient, updateIngredient, deleteSingleIngredient,
};
