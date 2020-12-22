'use strict';
import countries from './templates.hbs';
import API from './fetchCountries';
import { alert, error } from '@pnotify/core';

const searchForm = document.querySelector('.js_input');
const cardContainer = document.querySelector('.cardContainer');

const debounce = require('lodash/debounce');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  API.fetchCountries(searchQuery)
    .then(renderCountries)
    .catch(onFetchError, tooManyCountries)
    .finally(() => searchForm.reset());
}

function renderCountries(country) {
  const markup = countries(country);
  cardContainer.insertAdjacentHTML('afterbegin', markup);
}

function onFetchError({ error }) {
  error({ text: 'Ops, country is not found!!!' });
}
function tooManyCountries({ alert }) {
  if (data.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}
