import { getRefs } from './getRefs';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = getRefs();

let box = new SimpleLightbox('.picture-link', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

export function renderMarkupGallery(arr) {
    const markup = arr
        .map(
            ({
                largeImageURL,
                webformatURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => {
                return `<div class="picture-card">
          <a class="picture-link" href="${largeImageURL}">
            <img class="picture-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div>
            <p >
              <b>Likes</b>
              ${likes}
            </p>
            <p >
              <b>Views</b>
              ${views}
            </p>
            <p >
              <b>Comments</b>
              ${comments}
            </p>
            <p >
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>`;
            }
        )
        .join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup)
    box.refresh()

}