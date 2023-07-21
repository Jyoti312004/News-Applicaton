const API_KEY = "c5ed6ba4dcbd4de29142fc856f3c3790";
const url = "https://newsapi.org/v2/everything?q=";
// basically it work when window is loaded 
// so we add a event listener which listen when window load 
window.addEventListener("load",()=>fetchNews("india"));
function reload(){
    window.location.reload();
}
// fetchnews fnx to fetch the news
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemp = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article)=>{
        if(!article.urlToImage){
            return;
        }

        const cardclone = newsCardTemp.content.cloneNode(true);
        fillDataCard(cardclone,article);
        cardsContainer.appendChild(cardclone);



    });
}

function fillDataCard(cardclone,article){
    const newImg = cardclone.querySelector("#news-img");
    const newsTitle = cardclone.querySelector("#news-title");
    const newsSource = cardclone.querySelector("#news-source");
    const newsDesc = cardclone.querySelector("#news-desc");

    newImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name}.${date}`;
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}

let curSelNav = null;
function onNavItem(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelNav?.classList.remove("active");
    curSelNav = navItem;
    curSelNav.classList.add("active");
    
}

const searchbutton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchbutton.addEventListener("click",()=>{
    const query = searchText.value;
    console.log(searchText.value);
    if(!query) return;
    fetchNews(query);
    curSelNav?.classList.remove("active");
    curSelNav = null;
});