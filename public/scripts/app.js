// filter show

const filterButton = document.querySelector(".filter-button");

filterButton.addEventListener("click", filterSlide);

function filterSlide() {
  const filter = document.querySelector(".filters-hidden");
  filter.classList.add("filters-show");
}

// filter gone

const closeFilter = document.querySelector(".close-filter");

closeFilter.addEventListener("click", filterClose);

function filterClose() {
  const filter = document.querySelector(".filters-hidden");

  filter.classList.remove("filters-show");
}

// range tracker
