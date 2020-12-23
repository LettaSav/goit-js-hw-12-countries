'use strict';
import country from './templates.hbs';
import fetchCountries from './fetchCountries';
import { alert, error } from '@pnotify/core';
import countriesList from './countriesTemplates.hbs';

const searchForm = document.querySelector('.js_input');
const cardContainer = document.querySelector('.cardContainer');

const debounce = require('lodash/debounce');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .then(countrySearch)
    .catch(onFetchError)
    .finally(() => resetForm());
}

function renderCountries(countries) {
  const markup = countries.map(country => template(country)).join();
  cardContainer.insertAdjacentHTML('afterbegin', markup);
}

function onFetchError() {
  error({ text: 'Please enter name of country' });
}

function resetForm() {
  cardContainer.innerHTML = '';
}
function countrySearch(data) {
  if (data.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  } else if (data.length >= 2) {
    renderCountries(data, countriesList);
  } else if (data.status === 404) {
    error({ text: 'Ops, country is not found!!!' });
  } else {
    renderCountries(data, country);
  }
}
