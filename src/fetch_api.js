const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(countryName) {
  return fetch(`${BASE_URL}//${pokecountryName}`).then(response =>
    response.json(),
  );
}

export default { fetchCountry };
