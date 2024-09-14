import { clientCredentials } from '../utils/client';

const createLiquor = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/liquor`, {
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

const getLiquors = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/liquor`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleLiquor = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/liqour/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

    .then((data) => resolve(data))
    .catch(reject);
});

const updateLiqour = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/liquor/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload.id),
  })
    .then(() => resolve())
    .catch(reject);
});

const deleteSingleLiquor = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/liquor/${id}`, {
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
  createLiquor, getLiquors, getSingleLiquor, updateLiqour, deleteSingleLiquor,
};
