// IMPORT AXIOS
import axios from 'axios';
// IMPORT LODASH
import _ from 'lodash';
// Import all of Bootstrap's JS
// import * as bootstrap from 'bootstrap'
import Alert from 'bootstrap/js/dist/alert'
import { Tooltip, Toast, Popover } from 'bootstrap'
import { data } from 'autoprefixer';


// VARIABLES
let newsDataArr = [];
let startIndex = 0;
let endIndex = 10;


// API's 
// https://hacker-news.firebaseio.com/v0/newstories.json
// per id 'https://hacker-news.firebaseio.com/v0/item/';

//get 500 news

axios.get(process.env.API_MAIN)
.then((res)=>{
    newsDataArr = res.data;
      displayNews();
    console.log(res)
})
.catch((err)=> {
    console.log(err)
})

// // FUNCTION TO DISPLAY THE NEWS

function displayNews(){
    newsDetails.innerHTML = '';
    startIndex = 0;
    endIndex = 10;
const firstTenNews = newsDataArr.slice(startIndex, endIndex);

firstTenNews.forEach((news)=>{
    axios.get(process.env.API_ITEM+ news +'.json')
    .then((res)=>{
        const news=res.data;
        const title = news.title;
        const description = news.text;
        const url = news.url;
        const time = new Date(news.time * 1000).toLocaleString();

    //create news element

    const newsElement=document.createElement("div");
    newsElement.classList.add("newsElement")
    newsElement.innerHTML=
    `<div>
        <h3>${title}</h3>
        <p>${time}</p> 
        <a href="${url}">Read Here</a> 
     </div>
    <br>`;

    newsDetails.appendChild(newsElement);
    })
    .catch((err)=>{
        console.log(err);
    });
});
}

// // LOAD MORE NEWS FUNCTION
function loadMoreNews() {
    startIndex += 10;
    endIndex += 10;

const loadMoreBtn = document.querySelector('#loadMoreBtn');
loadMoreBtn.addEventListener('click', () => {
  displayNews(10);
});

}