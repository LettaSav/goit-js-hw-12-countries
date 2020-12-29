'use strict';

import { name } from 'file-loader';

const url = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(searchQuery) {
  return fetch(`${url}` + `${searchQuery}`).then(res => res.json());
}
export default fetchCountries;
