import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

const breedSelect = document.querySelector('.breed-select');
const select = new SlimSelect({
  select: breedSelect,
});
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

breedSelect.style.display = 'none';
catInfo.style.display = 'none';
hideError();

fetchBreeds(BASE_URL)
  .then(breeds => {
    hideLoader();
    select.setData(
      breeds.map(breed => ({ value: breed.id, text: breed.name }))
    );
  })
  .catch(error => {
    console.error('Error:', error);
    hideLoader();
    showError();
  });

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    showLoader();
    hideError();
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        hideLoader();
        displayCatInfo(catData[0]);
      })
      .catch(error => {
        console.error('Error:', error);
        hideLoader();
        showError();
      });
  } else {
    clearCatInfo();
  }
});

function displayCatInfo(catData) {
  clearCatInfo();

  const catImage = document.createElement('img');
  catImage.src = catData.url;
  catImage.classList.add('cat-image');

  const breedInfo = document.createElement('div');
  breedInfo.classList.add('breed-info');

  const breedName = document.createElement('h2');
  breedName.textContent = catData.breeds[0].name;
  breedName.classList.add('breed-name');

  const description = document.createElement('p');
  description.textContent = catData.breeds[0].description;
  description.classList.add('breed-description');

  const temperament = document.createElement('p');
  temperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;
  temperament.classList.add('breed-temperament');

  breedInfo.innerHTML = `
    ${breedName.outerHTML}
    ${description.outerHTML}
    ${temperament.outerHTML}
  `;

  catInfo.innerHTML = `
    ${catImage.outerHTML}
    ${breedInfo.outerHTML}
  `;

  catInfo.style.removeProperty('display');
}

function clearCatInfo() {
  catInfo.innerHTML = '';
  catInfo.style.display = 'none';
}