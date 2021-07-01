import fetchCountries from './js/fetchCountries.js';
import list from './templates/countriesList.hbs';
import card from './templates/countryCard.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, notice, info, success, error } from '@pnotify/core';

  
const refs = {
    input: document.querySelector('[data-action="input"]'),
    container:document.querySelector('.container'),
}
const debounce = require('lodash.debounce');
let searchQuery = '';

refs.input.addEventListener('input', debounce(onSearch, 500));


function onSearch(e) {
     if(!e.target.value) {
        return;
    };
    searchQuery = e.target.value;
    fetchCountries(searchQuery).then(render).catch(onCatch);
    
};


function render(countries) {
    if (countries.length === 1) {
        renderCountry(countries);     
    } else if (countries.length > 1 && countries.length <= 10) {
        renderCountries(countries);        
    } else if (countries.length > 10) {
        alert({
        text: "Too many countries!Please enter more specific!"
        });
    }
}

function renderCountry(countries) {
    countries.forEach(country => {
        refs.container.innerHTML = card(country);
        refs.input.value = '';
    });    
};

function renderCountries(countries) {
    const countriesArray = countries.map(country => country.name);
    refs.container.innerHTML = list(countriesArray);
};

function onCatch (er) {
    error({
        text:`${er}`
    })
};