// IMPORT AXIOS
import axios, { Axios } from 'axios';
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
    // const newsContainer = document.createElement("div");
    // newsDetails.innerHTML = '';
const newsSlice = newsDataArr.slice(startIndex, endIndex);

newsSlice.forEach((news)=>{
    axios.get(process.env.API_ITEM + news +'.json')
    .then((res)=>{
        const news=res.data;
        const title = news.title;
        const time = new Date(news.time * 1000).toLocaleString();
        const url = news.url;
        

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

// newsDetails.appendChild(newsContainer);

}

// // LOAD MORE NEWS FUNCTION
function loadMoreNews() {
    startIndex += 10;
    endIndex += 10;
    displayNews();

    console.log(startIndex)
    console.log(endIndex)
   
}

// const newsDetails = document.querySelector('#newsDetails');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
loadMoreBtn.addEventListener('click',loadMoreNews);

