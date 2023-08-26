import Notiflix from 'notiflix';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_iaI6IZWu59cRc57tpwou70rQEt5HpMASN3XUcZegpYsQMmTHtXP9FKvQBc66myBx';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
};

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => {
      Notiflix.Report.warning('Error fetching cat');
      console.log(error);
      throw error;
    });
}
