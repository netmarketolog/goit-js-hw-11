import { getRefs } from './getRefs';

const refs = getRefs();

export function clearCountriesList() {
    refs.countriesList.innerHTML = ''
}

export function clearCountryInfo() {
    refs.countryInfo.innerHTML = ''
}

export function renderCountryInfo(data) {
    const markupCountries = data.map(({ name, flags, capital, languages, population }) => `
             <div class="country-info__box">
             <img class="country-list__img" src='${flags.svg}' width="50">
             <h2 class="country-list__title">${name.official}</h2>
             </div>
              <div class="country-info__text">
                <p> Capital : <span>${capital}</span></p>
                <p> Population : <span>${population}</span></p>
                <p> Langues : <span>${Object.values(languages)}</span></p>
              </div> `).join('');
    return refs.countryInfo.insertAdjacentHTML('beforeend', markupCountries)


}

export function renderCountryList(data) {
    const markupList = data.map(({ name, flags }) =>
        `<li class="country-list__item">
<img class="country-list__img" src='${flags.svg}' width="40" height="20" alt="flag">
 <h2>${name.official}</h2>
 </li>`).join('');
    return refs.countriesList.insertAdjacentHTML('beforeend', markupList);
}