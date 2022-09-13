import debounce from 'lodash.debounce'
import './css/styles.css';
import { Notify } from 'notiflix';
import { getRefs } from './getRefs';
import { fetchCountries } from './fetchCountries'
import { clearCountriesList, clearCountryInfo, renderCountryInfo, renderCountryList } from './clearFn'

const DEBOUNCE_DELAY = 300;

const refs = getRefs()
refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(e) {
    const inputValue = e.target.value.trim()
    if (!inputValue) {
        clearCountriesList()
        clearCountryInfo()
        return;
    }
    fetchCountries(inputValue).then(onFetchSuccess).catch(onFetchError);
}

function onFetchSuccess(data) {
    clearCountriesList()
    clearCountryInfo()

    if (data.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
    }
    if (data.length >= 2 && data.length <= 10) {
        renderCountryList(data)
    }

    if (data.length === 1) {
        renderCountryInfo(data)
    }


}

function onFetchError() {

    Notify.failure("Oops, there is no country with that name")

}