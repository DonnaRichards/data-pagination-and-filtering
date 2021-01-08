/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const ITEMSPERPAGE = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showNoResults() {
   let ul = document.querySelector("ul.student-list");
   const noResultsMessage = ul.appendChild("h3");
   noResultsMessage.textContent = "No results found";
   ul = document.querySelector("ul.link-list");
   ul.insertAdjacentHTML('beforeend', '');
}

function showPage( studentList, pageNumber ) {

   if ( typeof(pageNumber) != "number" || pageNumber <= 0 ) {
      showNoResults();
   }

   const startIndex = (pageNumber * ITEMSPERPAGE) - ITEMSPERPAGE;
   const endIndex = pageNumber * ITEMSPERPAGE;

   const ul = document.querySelector("ul.student-list");
   ul.innerHTML = "";
   for (let i = startIndex; i < studentList.length && i < endIndex; i++) {
      const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${studentList[i].picture.thumbnail}" alt="Profile Picture">
               <h3>${studentList[i].name.first} ${studentList[i].name.last}</h3>
               <span class="email">${studentList[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${studentList[i].registered.date}</span>
            </div>
         </li>
         `
      ul.insertAdjacentHTML('beforeend', html);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination( studentList ) {

   const ul = document.querySelector("ul.link-list");
   ul.innerHTML = "";

   let numPages;
   const remainder = studentList.length % ITEMSPERPAGE;

   if ( studentList.length ) {
      if ( remainder ) {
         numPages = Math.floor( studentList.length / ITEMSPERPAGE ) + 1;
      } else {
         numPages = studentList.length / ITEMSPERPAGE;
      }
   } else {
      numPages = 0;
   }

   let pageListHtml = '';
   for (let i = 1; i <= numPages; i++) {
      pageListHtml += `
         <li>
            <button type="button">${i}</button>
         </li>
         `
   }
   ul.insertAdjacentHTML('beforeend', pageListHtml);

   if ( numPages > 0 ) {
      ul.firstElementChild.className = "active";

      ul.addEventListener('click', (event) => {
         if (event.target.tagName == 'BUTTON') {
            // remove class name from all li elements to ensure none have active class
            const li = document.querySelectorAll('ul > li');
            for (let i=0; i < li.length; i++) {
               li[i].className = "";
            }
            // set active class on the parent li element of the button that was clicked
            const parentLi = event.target.parentNode; 
            parentLi.className = "active";
            // text content of the button is page number to display,
            // convert to an integer as showPage function needs a numeric value
            const pageNumber = parseInt(event.target.textContent);
            if ( pageNumber ) {
               showPage(studentList, pageNumber);
            }
         }
      })
   } else {
      showNoResults();
   }
}

function addSearchBar() {
   const header = document.querySelector('header');
   const searchHTML = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button">
            <img src="img/icn-search.svg" alt="Search icon">
         </button>
      </label>
   `
   header.insertAdjacentHTML('beforeend', searchHTML);
}

function searchFunction( studentList ) {


   function searchForName(searchText) {
      return studentList.name.toLowerCase().includes(searchText.toLowerCase());
   }

   const searchInput = document.getElementById("search");
   const searchButton = searchInput.nextElementSibling;
   
   searchButton.addEventListener('click', (event) => {
      let searchResults = [];
      searchText = searchInput.value;
      if ( searchText ) {
         // Reference for use of array filter method - 
         // https://stackoverflow.com/questions/35231008/filter-an-array-based-on-an-object-property
         searchResults = studentList.filter( searchForName(searchText) );
         addPagination( searchResults );
      }
   });

}

//function textSearch

// Call functions

showPage(data, 1);
addSearchBar();
addPagination(data);
searchFunction(data);
