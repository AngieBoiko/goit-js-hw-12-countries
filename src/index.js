'use strict';
import './sass/main.scss';
import fetchCountries from './js/fetchCountries.js';
import list from './templates/countriesList.hbs';
import card from './templates/countryCard.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { alert, notice, info, success, error } from '@pnotify/core';



  
const refs = {
    input: document.querySelector('[data-action="input"]'),
    container: document.querySelector('.container'),
    resetBtn:document.querySelector('[data-action="reset-button"]'),
}
const debounce = require('lodash.debounce');
let searchQuery = '';

refs.input.addEventListener('input', debounce(onSearch, 500));
refs.resetBtn.addEventListener('click', onReset);

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

function renderCountry(country) {
    clearContent();
    const marupCard = card(country);
        refs.container.innerHTML =marupCard ;
    
   
};

function renderCountries(countries) {
    clearContent();
    const markupList=list(countries);
    refs.container.innerHTML = markupList;
};

function onCatch(er) {
    clearContent();
    error({
        text:`${er}`
    })
};

    function clearContent() {
    refs.container.innerHTML=''
};
function onReset(event) {
    event.preventDefault();
    clearContent()
    refs.input.value=''
}
