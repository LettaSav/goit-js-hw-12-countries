'use strict';

import { name } from 'file-loader';

const url = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries({ name }) {
  return fetch(`${url}` / `${name}`).then(res => res.json());
}
export default fetchCountries;
