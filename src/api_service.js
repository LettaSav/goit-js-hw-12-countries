'use strict';
import countries from './templates.hbs';
import fetchCountries from './fetchCountries';
import { alert, error } from '@pnotify/core';

const searchForm = document.querySelector('.js_input');
const cardContainer = document.querySelector('.cardContainer');

const debounce = require('lodash/debounce');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    })
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => resetForm());
}

function renderCountries(countries, country) {
  const markup = countries(country);
  cardContainer.insertAdjacentHTML('afterbegin', markup);
}

function onFetchError() {
  error({ text: 'Ops, country is not found!!!' });
}

function resetForm() {
  cardContainer.innerHTML = '';
}
