import countries from './templates.hbs';
import API from './fetch_api';
import _ from 'lodash';

const searchForm = document.querySelector('.js_input');
const cardContainer = document.querySelector('.cardContainer');
let searchQuery = '';

const debounce = require('lodash/debounce');
const debouncedFunction = debounce(() => {
  onSearch;
}, 500);

searchForm.addEventListener('input', debouncedFunction);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  searchQuery = form.elements.query.value;

  API.fetchCountry(searchQuery)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountries(country) {
  const markup = countries(country);
  cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, страна не найдена!!!');
}
