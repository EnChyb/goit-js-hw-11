import axios from "axios";
import Notiflix from "notiflix";

const form = document.querySelector("#search-form");
const input = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
console.log(input);

const qValue = input.value.split(" ").join("+");
const searchParams = new URLSearchParams({
  _q: "",
  _image_type: "photo",
  _orientation: "horizontal",
  _safesearch: "true",
  _per_page: "40",
  _page: "1",
        });

async function fetchImg() {
  
  //Zapytanie HTTP 
  searchParams.set("q", qValue);
  const response = await axios
    .get(`https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&${searchParams}`)
    .then(response => response.data)
    .then(({ hits }) => {
    const markup = hits
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
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.warning('Oops! Something went wrong. Please try again!')
  })
    
};


form.addEventListener("submit", (e) => {
  e.preventDefault();
  gallery.replaceChildren();
  fetchImg();

  })

