import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const input = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");

const qValue = "sun";//input.value.split(" ").join("+");
let page = 1;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const pictures = await fetchPixabay();
    renderGallery(pictures);
  } catch (error) {
    console.log(error.message);
  }


});

async function fetchPixabay() {
    const searchParams = new URLSearchParams({
    _key: "42474865-55c278fe0045234625bd75cd9",
    _q: "",
    _image_type: "photo",
    _orientation: "horizontal",
    _safesearch: "true",
    _per_page: "40",
    _page: page,
    });
  searchParams.set("q", qValue);


  const response = await axios
    .get(`https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&${searchParams}`);

  const { hits, totalHits } = response.data;
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)

  return hits;
  
}

function renderGallery(items) {
  const markup = items
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return `<div class="photo-card">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
              <b>${likes} Likes</b>
              </p>
              <p class="info-item">
              <b>${views} Views</b>
              </p>
              <p class="info-item">
              <b>${comments} Comments</b>
              </p>
              <p class="info-item">
              <b>${downloads} Downloads</b>
              </p>
            </div>
          </div>`;
            })
        .join("");
      gallery.innerHTML = markup;
}

function messageToUser() {
  if (hits.length <= 0) {
    Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
  }
}