import { clientCredentials } from '../utils/client';

const createIngredient = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient`, {
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

const getIngredients = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient?user=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateIngredient = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const deleteSingleIngredient = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ingredient/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createIngredient, getIngredients, getSingleIngredient, updateIngredient, deleteSingleIngredient,
};
