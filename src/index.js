import API from './js/fetchCountries.js';
import countriesList from './templates/countriesList.hbs';
import countryCard from './templates/countryCard.hbs';

const refs = {
    input: document.querySelector('[data-action="input"]'),
    container:document.querySelector('.container'),
}
const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    const inputItem = e.target;
    const searchQuery = inputItem.value.trim();
    API.fetchCountries(searchQuery)
        .then((data) => {
            if (data.length >= 2 && data.length <= 10) {
                renderList(data);
            }
        })
        .then((data) => {
            if (data.length < 2) {
                renderCard(data);
            };
            
        });
};

function renderList(countries) {
    const markup = countriesList(countries);
    refs.container.innerHTML = markup;
};
function renderCard(country) {
    const markupCard = countryCard(country);
    refs.container.innerHTML = markupCard;
};