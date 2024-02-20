import axios from "axios";

const qInput = document.querySelector("#search-form").value;
  
export async function fetchImg() {
    const searchParams = new URLSearchParams({
        _key: "42474865-55c278fe0045234625bd75cd9l",
        _q: qInput.split(" ").join("+"),
        _image_type: "photo",
        _orientation: "horizontal",
        _safesearch: "true",
    });
    console.log(searchParams);
    const response = await axios
        .get(`https://pixabay.com/api/?${searchParams}`);
    return response.data;
}
