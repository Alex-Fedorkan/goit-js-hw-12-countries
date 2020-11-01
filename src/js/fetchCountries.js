const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

function fetchCountries(nameOfCountry) {
    return fetch(`${BASE_URL}${nameOfCountry}`).then(response => 
        response.json(),
    );
}

export default { fetchCountries };
