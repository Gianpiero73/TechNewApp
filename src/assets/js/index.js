// IMPORT AXIOS
import axios, { Axios } from "axios";
//BOOTSTRAP
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";
import { data } from "autoprefixer";

// VARIABLES
let newsDataArr = [];
let startIndex = 0;
let endIndex = 10;

// API's
// API_MAIN="https://hacker-news.firebaseio.com/v0/newstories.json"
// API_ITEM = 'https://hacker-news.firebaseio.com/v0/item/'

//get 500 news

axios
  .get(process.env.API_MAIN)
  .then((res) => {
    newsDataArr = res.data;
    displayNews();
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// // FUNCTION TO DISPLAY THE NEWS

function displayNews() {
  const newsSlice = newsDataArr.slice(startIndex, endIndex);

  newsSlice.forEach((news) => {
    axios
      .get(process.env.API_ITEM + news + ".json")
      .then((res) => {
        const news = res.data;
        const title = news.title;
        const time = new Date(news.time * 1000).toLocaleString();
        const url = news.url;
        // window.open(url, "_blank").focus();

        //create news element
        const newsElement = document.createElement("div");
        newsElement.classList.add("newsElement");
        newsElement.innerHTML = `
      <div class="card p-2 mb-2 mx-auto col-7 text-center;">
        <h3>${title}</h3>
        <p>${time}</p> 
        <a href="${url}" target="_blank"git push -u origin main
        >Read Here</a>
      </div> <br>
      `;
        const newsDetails = document.querySelector("#newsDetails");
        newsDetails.appendChild(newsElement);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
// // LOAD MORE NEWS FUNCTION

function loadMoreNews() {
  startIndex += 10;
  endIndex += 10;
  displayNews();
}
const loadMoreBtn = document.querySelector("#loadMoreBtn");
loadMoreBtn.addEventListener("click", loadMoreNews);
