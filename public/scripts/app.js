// filter tevoorschijn // 

let filterButton = document.querySelector("filter-button");
let filteren = document.querySelector(".filtersGone"); 

filterButton.addEventListener("click", menuSlide); 

function menuSlide(){
    filteren.classList.add(".filteren-show"); 
}
