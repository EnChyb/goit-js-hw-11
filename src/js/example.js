//const fetchUsersBtn = document.querySelector(".btn");
//const userList = document.querySelector(".user-list");



form.addEventListener("submit", async () => {
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


    const response = await axios
        .get(`https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&${searchParams}`);

    return response.data;
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





const form = document.querySelector("#search-form");
const input = document.querySelector(".search-input");
const gallery = document.querySelector(".gallery");
const loadBtn = document.querySelector(".load-more");
loadBtn.classList.add("hidden");

let page = 1;

const qValue = input.value.split(" ").join("+");
const searchParams = new URLSearchParams({
  _q: "",
  _image_type: "photo",
  _orientation: "horizontal",
  _safesearch: "true",
  _per_page: "40",
  _page: page,
        });

async function fetchImg() {
  
  //fetching data, markup and add gallery
  searchParams.set("q", qValue);
  const response = await axios
    .get(`https://pixabay.com/api/?key=42474865-55c278fe0045234625bd75cd9&${searchParams}`)
    .then(response => response.data)
    .then(({ totalHits }) => {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
  })
    
};

function galleryMarkup(items) {
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
      loadBtn.classList.remove("hidden");

}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  gallery.replaceChildren();
  fetchImg()
  page += 1;

  // Show load button after first request
  if (page > 1) {
    loadBtn.classList.remove("hidden");
    }

  
  form.reset();
  })

