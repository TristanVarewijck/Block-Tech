// filter show

let filterButton = document.querySelector(".filter-button");

filterButton.addEventListener("click", filterSlide); 

function filterSlide(){
    let filter = document.querySelector(".filters-hidden");
    filter.classList.add("filters-show");
}

// filter gone

let closeFilter = document.querySelector(".close-filter");

closeFilter.addEventListener("click", filterClose); 

function filterClose(){
    let filter = document.querySelector(".filters-hidden");

    filter.classList.remove("filters-show"); 
}


// range tracker 




