import './css/styles.css';

import { getRefs } from './js/getRefs'
import { fetchImgSearch } from './js/fetchImgSearch'
import { renderMarkupGallery } from './js/renderMarkupGallery'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs()

let page = 1;
let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch)
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault()
    searchQuery = e.currentTarget.elements.searchQuery.value.trim()
    page = 1;

    if (!searchQuery) {
        refs.btnLoadMore.classList.add('is-hidden');
        refs.gallery.innerHTML = ''
        Notify.failure(
            'Sorry, there are no images matching your search. Please try another request.');

        return
    }
    const response = await fetchImgSearch(searchQuery, page);

    if (response.totalHits > 40) {
        refs.btnLoadMore.classList.remove('is-hidden');
        refs.endOfResults.classList.add('is-hidden');
    } else {
        refs.btnLoadMore.classList.add('is-hidden');
        refs.endOfResults.classList.remove('is-hidden');
    }


    if (response.totalHits > 0) {
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
        refs.gallery.innerHTML = '';
        renderMarkupGallery(response.hits);

    }

    if (response.totalHits === 0) {
        refs.gallery.innerHTML = '';
        Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.btnLoadMore.classList.add('is-hidden');
        refs.endOfResults.classList.add('is-hidden');
    }



}
async function onLoadMore() {
    page += 1;
    const response = await fetchImgSearch(searchQuery, page);
    renderMarkupGallery(response.hits)

    if (page > response.totalHits / 40) {
        refs.btnLoadMore.classList.add('is-hidden');
        refs.endOfResults.classList.remove('is-hidden');
    }

}