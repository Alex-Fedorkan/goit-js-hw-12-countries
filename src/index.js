import './styles.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import API from './js/fetchCountries';
import countriesNameListTpl from './templates/list-of-countries.hbs';
import country from './templates/country.hbs';

const debounce = require('lodash.debounce');

const refs = {
    answerBoxEl: document.querySelector('.js-container'),
    inputEl: document.querySelector('.input')
}

refs.inputEl.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
    const searchQuery = event.target.value;

    if (searchQuery === "") {
    refs.answerBoxEl.innerHTML = '';
        
        return;
    }
    if (API.fetchCountries(searchQuery).status === 404) {
        console.log('Shit');
    }
    API.fetchCountries(searchQuery).then(renderResult);
}

function renderResult(searchResult) {
    refs.answerBoxEl.innerHTML = '';

    if (searchResult.length > 10) {
        error({
            title: 'Too many matches found. Please enter a more specific query!',
            delay: 3000,
            mouseReset: false,
            closerHover: false,
            stickerHover: false
        })
        return;
    }

    if (searchResult.length > 1) {
        refs.answerBoxEl.insertAdjacentHTML('afterbegin', countriesNameListTpl(searchResult));
        return;
    }

    if (searchResult.length > 0) { 
        refs.answerBoxEl.insertAdjacentHTML('afterbegin', country(...searchResult));
        return;
    }

    error({
        title: 'Something go wrong!',
        delay: 3000,
        mouseReset: false,
        closerHover: false,
        stickerHover: false
        })
}