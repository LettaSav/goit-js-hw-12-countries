'use strict';
import countries from './templates.hbs';
import fetchCountries from './fetchCountries';
import { alert, error } from '@pnotify/core';

import countriesList from './countriesTemplates.hbs';
import debounce from 'lodash/debounce';
import { templates } from 'handlebars';

const searchForm = document.querySelector('.js_input');
const cardContainer = document.querySelector('.cardContainer');

searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.value;

  fetchCountries(searchQuery)
    .finally(() => resetForm())
    .then(countrySearch)
    .catch(onFetchError);
}

function renderCountries(data, template) {
  const markup = template(data);
  cardContainer.insertAdjacentHTML('afterbegin', markup);
}

function resetForm() {
  cardContainer.innerHTML = '';
}
function countrySearch(data) {
  if (data.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 1000,
    });
  } else if (data.length >= 2) {
    renderCountries(data, countriesList);
  } else if (data.status === 404) {
    error({
      text: 'Ops, country is not found!!!',
      delay: 1000,
    });
  } else {
    renderCountries(data, countries);
  }
}

function onFetchError() {
  error({ text: 'Please enter name of country' });
}
