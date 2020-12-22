const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountry({ name }) {
  return fetch(`${BASE_URL}`).then(response => response.json());
}

export default { fetchCountry };
