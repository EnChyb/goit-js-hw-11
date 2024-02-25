import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const input = document.querySelector("#search-form input");
const gallery = document.querySelector(".gallery");
//const loadBtn = document.querySelector(".load-more");
//loadBtn.classList.add("hidden");

let qValue; 
console.log(qValue);
let page = 1;
let searchedValue;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //loadBtn.classList.add("hidden");
  searchedValue = input.value.trim();

  // Empty input to fetch
  if (!searchedValue) {
      Notiflix.Notify.info('Please enter keywords again');
      return;
  }
  
  qValue = searchedValue.split(" ").join("+");


  try {
    const pictures = await fetchPixabay(qValue, page);
    renderGallery(pictures);
    const totalHits = pictures.totalHits;
    //page += 1;
    
    // if no images matches to searched value
    if (!totalHits) {
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    }



  } catch (error) {
    console.log(error.message);
  }


});

//loadBtn.addEventListener("click", async () => {
  
  //try {
  //  page += 1;
  //  await fetchPixabay(page);  
  //} catch (error) {
  //  console.log(error.message);
  //}

//});


async function fetchPixabay(qValue, page) {
    const searchParams = new URLSearchParams({
    key: "42474865-55c278fe0045234625bd75cd9",
    q: qValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: "40",
    page: page,
    });


  const response = await axios
    .get(`https://pixabay.com/api/?${searchParams}`);

  return response.data;
  
}

function renderGallery(items) {
  const markup = items.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
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
  gallery.insertAdjacentHTML('beforeend', markup);
  //loadBtn.classList.remove('hidden');
}

