import countries from './templates';

const searchForm = document.querySelector('.js_input');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  API.fetchCountry(searchQuery)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountries(country) {
  const markup = countries(country);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError(error) {
  alert('Упс, страна не найдена!!!');
}

// =========================================

const url =
  'https://newsapi.org/v2/everything?q=carshttps://restcountries.eu/rest/v2/name';

fetch(url)
  .then(r => r.json())
  .then(console.log);
