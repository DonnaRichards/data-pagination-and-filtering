/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const ITEMSPERPAGE = 9;

/**
 *`showPage` function
 *This function will create and insert/append the elements needed to display a "page" of nine students
 * @param  {} studentList - list of student objects
 * @param  {} pageNumber - integer containing page number to display
 */
function showPage( studentList, pageNumber ) {

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
/**
 * `addSearchBar` function
 * Simply adds HTML code to display search bar on page.   
 * No search handling, this is performed by other functions.
 */
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


/**
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
 * @param  {} studentList - list of student objects
 */
function addPagination( studentList ) {

   const ul = document.querySelector("ul.link-list");
   ul.innerHTML = "";

   const numPages = () => {
      const remainder = studentList.length % ITEMSPERPAGE;
      if ( remainder ) {
         return Math.floor( studentList.length / ITEMSPERPAGE ) + 1;
      } else {
         return studentList.length / ITEMSPERPAGE;
      }
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
   });
}


// Main program

showPage(data, 1);
addSearchBar();
addPagination(data);

