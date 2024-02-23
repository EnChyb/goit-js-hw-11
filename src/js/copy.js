import axios from "axios";
import Notiflix from "notiflix";

const form = document.querySelector("#search-form");
const input = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
console.log(input);

const qValue = form.elements[0].value.split(" ").join("+");


async function fetchImg() {
  try {
    //Zapytanie HTTP https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&q=${qValue}&image_type=photo&orientation=horizontal&safesearch=true
    const searchParams = new URLSearchParams({
        _q: qValue,
        _image_type: "photo",
        _orientation: "horizontal",
        _safesearch: "true",
        _per_page: "40",
        _page: "1",
        });
    const response = await axios
        .get(`https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&${searchParams}`); 
    console.log(response.data); 
        }
  catch (error) {
  
}
  
    //Stworzenie galerii zdjęć 
    const { hits } = response.data;
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

    //Jeśli backend zwraca pustą tablicę 
//  if (response.data.length <= 0) {
//      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
      
 //   }
};

  //Jeśli backend zwraca pustą tablicę 
  //if (response.data.hits.length <= 0) {
  //   Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')     
 // }
 

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchImg();



  })

